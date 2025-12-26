import { useState } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { BoatFormStepper } from "@/components/BoatFormStepper"
import { toast } from "react-toastify"

import {
  IconCheck,
  IconX,
  IconTrash,
  IconExternalLink,
  IconPlus,
  IconPencil,
} from "@tabler/icons-react"

import { createBoatVideo, updateBoatVideo, toggleBoatVideoStatus } from "../api/boats.api"

export interface BoatVideo {
  id?: number
  title: string
  url: string
  imageUrl: string
}

export default function BoatVideoUploadPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams<{ id: string }>()

  const boatID =
    (location.state as { boatID?: number })?.boatID ?? Number(params.id)
  if (!boatID) return <div>Boat ID not found</div>

  const [videos, setVideos] = useState<BoatVideo[]>([])
  const [adding, setAdding] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)

  const [draft, setDraft] = useState<BoatVideo>({
    title: "",
    url: "",
    imageUrl: "",
  })

  const isLocked = adding || editingIndex !== null

  /* ---------------- Thumbnail Resolver ---------------- */
  const getThumbnail = async (url: string): Promise<string> => {
    // YouTube
    const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
    if (yt) return `https://img.youtube.com/vi/${yt[1]}/hqdefault.jpg`

    // Vimeo via oEmbed
    const vimeo = url.match(/vimeo\.com\/(\d+)/)
    if (vimeo) {
      const res = await fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`)
      const data = await res.json()
      return data.thumbnail_url
    }
    return ""
  }

  /* ---------------- Actions ---------------- */
  const saveNew = async () => {
    if (!draft.title || !draft.url) {
      toast.error("Title and URL required")
      return
    }

    setSaving(true)
    try {
      const imageUrl = await getThumbnail(draft.url)
      const payload = { ...draft, imageUrl, boat_VehicleID: boatID }

      const savedVideo = await createBoatVideo(payload)
      setVideos(prev => [...prev, { ...payload, id: savedVideo.id }])
      setDraft({ title: "", url: "", imageUrl: "" })
      setAdding(false)

      toast.success("Video added")
    } catch {
      toast.error("Failed to add video")
    } finally {
      setSaving(false)
    }
  }

  const saveEdit = async (index: number) => {
    if (!draft.title || !draft.url) return
    setSaving(true)
    try {
      const imageUrl = await getThumbnail(draft.url)
      const videoID = videos[index].id
      if (!videoID) throw new Error("Video ID missing")

      const payload = { ...draft, imageUrl, boat_VehicleID: boatID }
      await updateBoatVideo(videoID, payload)

      setVideos(prev => prev.map((v, i) => (i === index ? { ...payload, id: videoID } : v)))
      setEditingIndex(null)
      toast.success("Video updated")
    } catch {
      toast.error("Failed to update video")
    } finally {
      setSaving(false)
    }
  }

  const startEdit = (index: number) => {
    setDraft(videos[index])
    setEditingIndex(index)
  }

  const removeVideo = async (index: number) => {
    const videoID = videos[index].id
    if (videoID) {
      setSaving(true)
      try {
        await toggleBoatVideoStatus(videoID, false)
        setVideos(prev => prev.filter((_, i) => i !== index))
        toast.success("Video removed")
      } catch {
        toast.error("Failed to remove video")
      } finally {
        setSaving(false)
      }
    } else {
      // Local row, just remove
      setVideos(prev => prev.filter((_, i) => i !== index))
    }
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-muted/30 p-6 flex justify-center">
      <Card className="w-full max-w-6xl">
        <CardHeader>
          <CardTitle className="text-2xl">Boat Videos</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <BoatFormStepper currentStep={3} />

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Thumbnail</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>URL</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {videos.map((v, idx) => {
                const isEditing = editingIndex === idx
                return (
                  <TableRow key={idx}>
                    <TableCell>
                      {v.imageUrl && (
                        <img src={v.imageUrl} className="h-14 w-24 object-contain rounded bg-muted" />
                      )}
                    </TableCell>

                    <TableCell>
                      {isEditing ? (
                        <Input
                          value={draft.title}
                          onChange={e => setDraft({ ...draft, title: e.target.value })}
                        />
                      ) : v.title}
                    </TableCell>

                    <TableCell>
                      {isEditing ? (
                        <Input
                          value={draft.url}
                          onChange={e => setDraft({ ...draft, url: e.target.value })}
                        />
                      ) : (
                        <a
                          href={v.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                        >
                          View
                          <IconExternalLink size={14} />
                        </a>
                      )}
                    </TableCell>

                    <TableCell className="text-right flex gap-2 justify-end">
                      {isEditing ? (
                        <>
                          <Button size="icon" variant="ghost" onClick={() => saveEdit(idx)} disabled={saving} className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white cursor-pointer">
                            <IconCheck />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => setEditingIndex(null)} className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer">
                            <IconX />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button size="icon" variant="outline" disabled={isLocked} onClick={() => startEdit(idx)} className={`border-blue-500 text-blue-500 ${isLocked ? "opacity-40 cursor-not-allowed" : "hover:bg-blue-500 hover:text-white cursor-pointer"}`}>
                            <IconPencil size={18} />
                          </Button>
                          <Button size="icon" variant="outline" disabled={isLocked} onClick={() => removeVideo(idx)} className={`border-red-500 text-red-500 ${isLocked ? "opacity-40 cursor-not-allowed" : "hover:bg-red-500 hover:text-white cursor-pointer"}`}>
                            <IconTrash size={18} />
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}

              {adding && (
                <TableRow className="bg-muted/40">
                  <TableCell />
                  <TableCell>
                    <Input placeholder="Title" value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} />
                  </TableCell>
                  <TableCell>
                    <Input placeholder="Video URL" value={draft.url} onChange={e => setDraft({ ...draft, url: e.target.value })} />
                  </TableCell>
                  <TableCell className="text-right flex gap-2 justify-end">
                    <Button size="icon" variant="ghost" onClick={saveNew} disabled={saving} className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white cursor-pointer">
                      <IconCheck />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => setAdding(false)} className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer">
                      <IconX />
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="flex justify-between">
            <Button variant="outline" disabled={isLocked} onClick={() => { setAdding(true); setDraft({ title: "", url: "", imageUrl: "" }) }} className={`flex items-center gap-2 ${isLocked ? "opacity-40 cursor-not-allowed" : ""}`}>
              <IconPlus size={16} /> Add Video
            </Button>

            <Button disabled={isLocked} className={`ml-auto ${isLocked ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`} onClick={() => navigate("/")}>
              Complete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
