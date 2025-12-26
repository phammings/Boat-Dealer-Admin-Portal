import { useState } from "react"
import { toast } from "react-toastify";
import { deleteBoat } from "../api/boats.api"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { IconTrash } from "@tabler/icons-react"


interface DeleteBoatDialogProps {
  boatId: number
  onDeleted: () => void
}

export const DeleteBoatDialog = ({ boatId, onDeleted }: DeleteBoatDialogProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    setLoading(true)
    try {
      await deleteBoat(boatId)
      toast.success("Boat deleted successfully")
      onDeleted() // remove from state in parent
      setOpen(false)
    } catch (err) {
      toast.error("Failed to delete boat")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
            size="icon"
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
            >
            <IconTrash size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this boat?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
