import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { getPresignedUpload } from "../api/boats.api";
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
}

export default function BoatPhotoUploadPage() {
    const navigate = useNavigate()
  const location = useLocation();
  const params = useParams<{ id: string }>();

  // Failsafe: first check state, fallback to URL param
  const boatID =
    (location.state as { boatID?: number })?.boatID ?? Number(params.id);

  if (!boatID) return <div>Boat ID not found!</div>;

  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [uploading, setUploading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        isPrimary: photos.length === 0,
      }));
      setPhotos((prev) => [...prev, ...newFiles]);
    },
  });

  const handleSetPrimary = (index: number) => {
    setPhotos((prev) =>
      prev.map((p, i) => ({ ...p, isPrimary: i === index }))
    );
  };

  const handleRemove = (index: number) => {
    setPhotos((prev) => {
      const removed = [...prev]
      removed.splice(index, 1)

      if (prev[index].isPrimary && removed.length > 0) {
        removed[0].isPrimary = true
      }
      return removed
    })
  }

  const handleUpload = async () => {
    setUploading(true);
    try {
      for (const photo of photos) {
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
      navigate(`/create/videos/${boatID}`, { state: { boatID: boatID } });
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
        <BoatFormStepper currentStep={2}/>
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
                    onClick={() => {
                    setPhotos([]);
                    }}
                    className="hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
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
                    {/* Set as primary button - always visible */}
                    <Button
                        size="icon"
                        variant={photo.isPrimary ? "default" : "outline"}
                        onClick={() => handleSetPrimary(index)}
                        aria-label="Set as primary"
                    >
                        <IconStar className="w-4 h-4" />
                    </Button>

                    {/* Remove button - visible on hover for non-primary, always for primary */}
                    <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleRemove(index)}
                        aria-label="Remove photo"
                        className={`transition-opacity duration-200 opacity-0 group-hover:opacity-100`}
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
