import { useEffect, useMemo, useState } from "react"
import type { Boat } from "../types/Boat"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  IconChevronsLeft,
  IconChevronsRight,
  IconRotate,
} from "@tabler/icons-react"
import { restoreBoat } from "../api/boats.api"
import { toast } from "react-toastify"

function getDefaultPageSize() {
  if (window.innerWidth < 768) return 5
  return 10
}

interface Props {
  boats: Boat[] | null
  loading: boolean
  onView: (id: number) => void
}

export default function DeletedBoatTable({ boats, loading, onView }: Props) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(getDefaultPageSize)
  const [deletedBoats, setDeletedBoats] = useState<Boat[] | null>(boats)

  const totalItems = deletedBoats?.length ?? 0
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

  useEffect(() => {
    setDeletedBoats(boats)
  }, [boats])

  useEffect(() => setPage(1), [pageSize])

  const visibleBoats = useMemo(() => {
    if (!deletedBoats) return []
    const start = (page - 1) * pageSize
    return deletedBoats.slice(start, start + pageSize)
  }, [deletedBoats, page, pageSize])

  const FIXED_ROWS = 10
  const cell = "px-4 truncate whitespace-nowrap"

  const handleRestore = async (boatID: number) => {
    try {
        await restoreBoat(boatID)
        // remove from current deleted list
        setDeletedBoats((prev) => prev?.filter((b) => b.boatID !== boatID) ?? null)
        toast.success("Boat restored successfully")
    } catch {
        toast.error("Failed to restore boat")
    }
  }

  return (
    <div className="w-full">
      <div
        className="rounded-lg border shadow-sm overflow-x-auto sm:overflow-x-hidden overflow-y-auto"
        style={{ height: `${(FIXED_ROWS + 1) * 3.5}rem` }}
      >
        <Table className="w-full min-w-[800px] sm:table-fixed h-full">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 pl-7">ID</TableHead>
              <TableHead className="px-4">Make</TableHead>
              <TableHead className="px-4">Model</TableHead>
              <TableHead className="px-4">Year</TableHead>
              <TableHead className="px-4">Status</TableHead>
              <TableHead className="px-4">Source</TableHead>
              <TableHead className="px-4">Category</TableHead>
              <TableHead className="px-4">Class</TableHead>
              <TableHead className="px-4">Stock Number</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading &&
              Array.from({ length: FIXED_ROWS }).map((_, i) => (
                <TableRow key={i} className="h-12">
                  {Array.from({ length: 11 }).map((__, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {!loading &&
              visibleBoats.map((boat) => (
                <TableRow key={boat.boatID} className="h-12">
                  <TableCell className="px-4 whitespace-nowrap font-medium">
                    <a
                      onClick={() => onView(boat.boatID)}
                      className="inline-flex items-center gap-1 text-blue-600 hover:underline pl-5 cursor-pointer"
                    >
                      {boat.boatID}
                    </a>
                  </TableCell>

                  <TableCell title={boat.make} className={cell}>
                    {boat.make}
                  </TableCell>

                  <TableCell title={boat.model} className={cell}>
                    {boat.model}
                  </TableCell>

                  <TableCell title={String(boat.boatYear)} className={cell}>
                    {boat.boatYear}
                  </TableCell>

                  <TableCell title={String(boat.status)} className={cell}>
                    {boat.status}
                  </TableCell>

                  <TableCell title={boat.city} className={cell}>
                    {boat.city}
                  </TableCell>

                  <TableCell title={boat.category ?? "-"} className={cell}>
                    {boat.category ?? "-"}
                  </TableCell>

                  <TableCell title={boat.class ?? "-"} className={cell}>
                    {boat.class ?? "-"}
                  </TableCell>

                  <TableCell title={boat.stockNumber ?? "-"} className={cell}>
                    {boat.stockNumber ?? "-"}
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white cursor-pointer"
                        onClick={() => handleRestore(boat.boatID)}
                      >
                        <IconRotate size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {!loading && (!deletedBoats || deletedBoats.length === 0) && (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No deleted boats available
          </div>
        )}
      </div>

      {!loading && totalPages > 1 && (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-sm text-muted-foreground">Rows per page</span>
            <Select value={pageSize.toString()} onValueChange={(v) => setPageSize(Number(v))}>
              <SelectTrigger className="w-[90px] cursor-pointer hover:bg-gray-100 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20].map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Pagination>
            <PaginationContent className="flex justify-end gap-1 ml-auto">
              <PaginationItem>
                <Button size="icon" variant="ghost" disabled={page === 1} onClick={() => setPage(1)}>
                  <IconChevronsLeft size={18} />
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                  Prev
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button size="sm" variant="outline" disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                  Next
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button size="icon" variant="ghost" disabled={page === totalPages} onClick={() => setPage(totalPages)}>
                  <IconChevronsRight size={18} />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
