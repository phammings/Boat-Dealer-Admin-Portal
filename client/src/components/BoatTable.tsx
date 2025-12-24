import { useEffect, useMemo, useState } from "react"
import type { Boat } from "../types/Boat"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
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
  IconEye,
  IconPencil,
  IconTrash,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react"

/* ======================
   Page size defaults
====================== */
function getDefaultPageSize() {
  if (window.innerWidth < 768) return 5 // mobile
  return 10 // laptop & desktop
}

interface Props {
  boats: Boat[] | null
  loading: boolean
  onView: (id: number) => void
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export default function BoatTable({
  boats,
  loading,
  onView,
  onEdit,
  onDelete,
}: Props) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(getDefaultPageSize)

  const totalItems = boats?.length ?? 0
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

  useEffect(() => {
    setPage(1)
  }, [pageSize])

  const visibleBoats = useMemo(() => {
    if (!boats) return []
    const start = (page - 1) * pageSize
    return boats.slice(start, start + pageSize)
  }, [boats, page, pageSize])
  // fixed visual rows to reserve space when fewer items are present
  const FIXED_ROWS = 10

  return (
    <div className="w-full">
      {/* ================= TABLE ================= */}
      {/*
        Fixed container height (header + FIXED_ROWS rows). This ensures the
        table visual height is the same whether there are fewer rows or many.
        We allow vertical scrolling when content exceeds the fixed height.
      */}
      <div
        className="rounded-lg border shadow-sm overflow-x-auto w-full overflow-y-auto"
        style={{ height: `${(FIXED_ROWS + 1) * 3.5}rem` }}
      >
        <Table className="w-full table-auto md:table-fixed h-full">
          <TableHeader>
            <TableRow>
              <TableHead>Make</TableHead>
              <TableHead>Model</TableHead>
              <TableHead className="hidden md:table-cell">Year</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden lg:table-cell">City</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* ---------- SKELETON ---------- */}
            {loading &&
              // render FIXED_ROWS skeleton rows to stabilize height
              Array.from({ length: FIXED_ROWS }).map((_, i) => (
                <TableRow key={i} className="h-12">
                  <TableCell>
                    <Skeleton className="h-6 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-56" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-6 w-20" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-6 w-24" />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Skeleton className="h-6 w-32" />
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Skeleton className="h-8 w-8 rounded-md" />
                      <Skeleton className="h-8 w-8 rounded-md" />
                      <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}

            {/* ---------- DATA ---------- */}
            {!loading &&
              visibleBoats.map((boat) => (
                <TableRow key={boat.boatID} className="h-12">
                  <TableCell className="font-medium">
                    {boat.make}
                  </TableCell>

                  <TableCell className="max-w-[32rem] truncate">
                    {boat.model}
                  </TableCell>

                  <TableCell className="hidden md:table-cell">
                    {boat.boatYear}
                  </TableCell>

                  <TableCell className="hidden md:table-cell">
                    {boat.status ? "Active" : "Inactive"}
                  </TableCell>

                  <TableCell className="hidden lg:table-cell">
                    {boat.city}
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onView(boat.boatID)}
                      >
                        <IconEye size={18} />
                      </Button>

                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => onEdit(boat.boatID)}
                      >
                        <IconPencil size={18} />
                      </Button>

                      <Button
                        size="icon"
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        onClick={() => onDelete(boat.boatID)}
                        >
                        <IconTrash size={18} />
                        </Button>

                    </div>
                  </TableCell>
                </TableRow>
              ))}
        
          </TableBody>
        </Table>

        {/* If there are no boats (and not loading) show a centered message
            inside the fixed-height container so the layout stays consistent. */}
        {!loading && (!boats || boats.length === 0) && (
          <div className="flex items-center justify-center text-muted-foreground h-full">
            No boats available
          </div>
        )}
      </div>

      {/* ================= FOOTER ================= */}
      {!loading && totalPages > 1 && (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full mt-4">
          {/* Rows per page */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-sm text-muted-foreground">
              Rows per page
            </span>
            <Select
              value={pageSize.toString()}
              onValueChange={(v) => setPageSize(Number(v))}
            >
              <SelectTrigger className="w-[90px]">
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

          {/* ================= PAGINATION ================= */}
          <div className="flex w-full md:w-auto md:justify-end">
            <Pagination>
            <PaginationContent className="flex items-center gap-1">
                {/* START */}
                <PaginationItem>
                <Button
                    size="icon"
                    variant="ghost"
                    disabled={page === 1}
                    onClick={() => setPage(1)}
                    className="focus-visible:outline-none"
                >
                    <IconChevronsLeft size={18} />
                </Button>
                </PaginationItem>

                {/* PREVIOUS */}
                <PaginationItem>
                <Button
                    size="sm"
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="focus-visible:outline-none"
                >
                    Prev
                </Button>
                </PaginationItem>

                {/* PAGE - 1 */}
                {page > 1 && (
                <PaginationItem>
                    <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setPage(page - 1)}
                    className="focus-visible:outline-none"
                    >
                    {page - 1}
                    </Button>
                </PaginationItem>
                )}

                {/* CURRENT PAGE */}
                <PaginationItem>
                <div className="inline-flex items-center justify-center h-8 px-5 rounded-md text-sm font-semibold text-white bg-blue-600 cursor-default select-none hover:bg-blue-700">
                    {page}
                </div>
                </PaginationItem>

                {/* PAGE + 1 */}
                {page < totalPages && (
                <PaginationItem>
                    <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setPage(page + 1)}
                    className="focus-visible:outline-none"
                    >
                    {page + 1}
                    </Button>
                </PaginationItem>
                )}

                {/* NEXT */}
                <PaginationItem>
                <Button
                    size="sm"
                    variant="outline"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="focus-visible:outline-none"
                >
                    Next
                </Button>
                </PaginationItem>

                {/* END */}
                <PaginationItem>
                <Button
                    size="icon"
                    variant="ghost"
                    disabled={page === totalPages}
                    onClick={() => setPage(totalPages)}
                    className="focus-visible:outline-none"
                >
                    <IconChevronsRight size={18} />
                </Button>
                </PaginationItem>
            </PaginationContent>
            </Pagination>
            </div>

        </div>
      )}
    </div>
  )
}
