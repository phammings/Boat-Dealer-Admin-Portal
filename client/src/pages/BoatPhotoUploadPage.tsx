import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { getPresignedUpload, getBoatPhotos, updateBoatPhoto } from "../api/boats.api";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconTrash, IconStar } from "@tabler/icons-react";
import { BoatFormStepper } from "@/components/BoatFormStepper";
import { toast } from "react-toastify";

interface UploadedPhoto {
  file: File;
  preview: string;
  isPrimary: boolean;
  s3Key?: string;

  boatPhotoID?: number;
  isExisting?: boolean;
}

export default function BoatPhotoUploadPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ id: string }>();

  // Failsafe: first check state, fallback to URL param
  const boatID =
    (location.state as { boatID?: number })?.boatID ?? Number(params.id);

  if (!boatID) return <div>Boat ID not found!</div>;

  const isEditMode = location.pathname.startsWith("/edit/photos/");

  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!isEditMode) return;

    const fetchPhotos = async () => {
      try {
        const data = await getBoatPhotos(boatID);

        const mappedPhotos: UploadedPhoto[] = data
          .filter((p: any) => p.active && !p.hide)
          .map((p: any) => ({
            file: new File([], "existing-photo"),
            preview: p.photoURL,
            isPrimary: p.isPrimary,
            s3Key: p.photoURL,
            boatPhotoID: p.boatPhotoID,
            isExisting: true,
          }));

        setPhotos(mappedPhotos);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load existing boat photos");
      }
    };

    fetchPhotos();
  }, [isEditMode, boatID]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
    setPhotos((prev) => {
      const hasPrimary = prev.some((p) => p.isPrimary);

      const newFiles = acceptedFiles.map((file, index) => ({
        file,
        preview: URL.createObjectURL(file),
        isPrimary: !hasPrimary && index === 0,
      }));

      return [...prev, ...newFiles];
    });
  },
  });

  const handleSetPrimary = async (index: number) => {
    const selectedPhoto = photos[index];

    if (
      !isEditMode ||
      !selectedPhoto.isExisting ||
      !selectedPhoto.boatPhotoID
    ) {
      // UI-only behavior for create mode
      setPhotos((prev) =>
        prev.map((p, i) => ({ ...p, isPrimary: i === index }))
      );
      return;
    }

    try {
      const currentPrimary = photos.find(
      (p) => p.isPrimary && p.boatPhotoID !== undefined
    );

    // Unset old primary
    if (
      currentPrimary &&
      currentPrimary.boatPhotoID !== undefined &&
      currentPrimary.boatPhotoID !== selectedPhoto.boatPhotoID
    ) {
      await updateBoatPhoto(currentPrimary.boatPhotoID, {
        photoTitle: null,
        photoDescription: null,
        isPrimary: false,
        active: true,
      });
    }


      // Set new primary
      await updateBoatPhoto(selectedPhoto.boatPhotoID, {
        photoTitle: null,
        photoDescription: null,
        isPrimary: true,
        active: true,
      });

      setPhotos((prev) =>
        prev.map((p, i) => ({ ...p, isPrimary: i === index }))
      );

      toast.success("Primary photo updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update primary photo");
    }
  };

  // PUT REQUEST FIRES IMMEDIATELY ON DELETE
  const handleRemove = async (index: number) => {
    const photoToRemove = photos[index];

    if (isEditMode && photoToRemove.isExisting && photoToRemove.boatPhotoID) {
      try {
        await updateBoatPhoto(photoToRemove.boatPhotoID, {
          photoTitle: null,
          photoDescription: null,
          isPrimary: false,
          active: false,
        });
        toast.success("Photo deleted successfully.");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete photo");
        return;
      }
    }

    setPhotos((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);

      if (photoToRemove.isPrimary && updated.length > 0) {
        updated[0].isPrimary = true;
      }

      return updated;
    });
  };

  const handleClear = async () => {
  // EDIT MODE → soft delete all existing photos
  if (isEditMode) {
    const existingPhotos = photos.filter(
      (p) => p.isExisting && p.boatPhotoID
    );

    try {
      await Promise.all(
        existingPhotos.map((photo) =>
          updateBoatPhoto(photo.boatPhotoID!, {
            photoTitle: null,
            photoDescription: null,
            isPrimary: false,
            active: false,
          })
        )
      );

      toast.success("All photos deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete all photos");
      return;
    }
  }

  // Clear UI state (both modes)
  setPhotos([]);
};


  const handleUpload = async () => {
    setUploading(true);
    try {
      for (const photo of photos) {
        // Skip existing S3 photos in edit mode
        if (isEditMode && photo.isExisting) continue;

        const presigned = await getPresignedUpload({
          boatID,
          fileName: photo.file.name,
          contentType: photo.file.type,
          isPrimary: photo.isPrimary,
        });

        await axios.put(presigned.uploadUrl, photo.file, {
          headers: { "Content-Type": photo.file.type },
        });

        photo.s3Key = presigned.fileKey;
      }

      toast.success("All photos uploaded successfully!");
      setPhotos([]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload photos");
    } finally {
      setUploading(false);
      navigate(`/create/videos/${boatID}`, { state: { boatID } });
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 p-6 flex justify-center items-start">
      <Card className="w-full max-w-6xl">
        <CardHeader>
          <CardTitle className="text-2xl">Upload Boat Photos</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Stepper UI only */}
          <BoatFormStepper currentStep={2} />

          <div
            {...getRootProps()}
            className={`border-2 border-dashed p-8 text-center rounded-lg transition cursor-pointer ${
              isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop files here...</p>
            ) : (
              <p>Drag & drop photos here, or click to select files</p>
            )}
          </div>

          {photos.length > 0 && (
            <CardFooter className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {setPhotos([]); handleClear();}}
              >
                Clear
              </Button>
              <Button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload Photos"}
              </Button>
            </CardFooter>
          )}

          {photos.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative border rounded overflow-hidden group">
                  <div className="w-full h-64 bg-muted flex items-center justify-center">
                    <img
                      src={photo.preview}
                      alt="preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="absolute top-1 right-1 flex flex-col gap-1">
                    <Button
                      size="icon"
                      variant={photo.isPrimary ? "default" : "outline"}
                      onClick={() => handleSetPrimary(index)}
                    >
                      <IconStar className="w-4 h-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleRemove(index)}
                      className="transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                    >
                      <IconTrash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
