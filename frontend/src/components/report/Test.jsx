"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";

export default function StudentTable() {
    const [data, setData] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/student");
                if (!response.ok) throw new Error("Failed to fetch students");
                const rawData = await response.json();
                const mappedData = rawData.map((s) => ({
                    ...s,
                    examDate: s.examDate
                        ? new Date(s.examDate).toLocaleDateString()
                        : "",
                }));
                setData(mappedData);
            } catch (err) {
                console.error(err);
            }
        };
        fetchStudents();
    }, []);

    const columns = [
        { accessorKey: "regNo", header: "Examiner ID" },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "course1st", header: "Applied Course" },
        { accessorKey: "examDate", header: "Exam Date" },
        { accessorKey: "lastSchool", header: "School" },
        { accessorKey: "email", header: "Email" },
    ];

    useEffect(() => {
        setColumnVisibility(
            Object.fromEntries(columns.map((col) => [col.accessorKey, true]))
        );
    }, []);

    const table = useReactTable({
        data,
        columns,
        state: { sorting, columnVisibility },
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: { pageSize: 5 }, // default rows per page
        },
    });

    const currentPage = table.getState().pagination.pageIndex;
    const pageSize = table.getState().pagination.pageSize;

    return (
        <div className="space-y-2">
            {/* Column visibility */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline">
                        Columns
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {columns.map((col) => (
                        <DropdownMenuCheckboxItem
                            key={col.accessorKey}
                            checked={table.getColumn(col.accessorKey)?.getIsVisible()}
                            onCheckedChange={(val) =>
                                table.getColumn(col.accessorKey)?.toggleVisibility(!!val)
                            }
                        >
                            {col.header}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Table */}
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers
                                .filter((header) => header.column.getIsVisible())
                                .map((header) => (
                                    <TableHead
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className="cursor-pointer select-none"
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {{
                                            asc: <ChevronUp className="inline" />,
                                            desc: <ChevronDown className="inline" />,
                                        }[header.column.getIsSorted()] ?? null}
                                    </TableHead>
                                ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Pagination + Rows per page */}
            <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2 text-sm">
                    <span>Rows per page:</span>
                    <Select
                        value={String(pageSize)}
                        onValueChange={(val) => table.setPageSize(Number(val))}
                    >
                        <SelectTrigger className="w-[80px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {table.getPageCount() > 1 && (
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        table.previousPage();
                                    }}
                                    disabled={!table.getCanPreviousPage()}
                                />
                            </PaginationItem>

                            {Array.from({ length: table.getPageCount() }).map((_, i) => {
                                const isActive = i === currentPage;
                                if (
                                    i === 0 ||
                                    i === table.getPageCount() - 1 ||
                                    Math.abs(i - currentPage) <= 1
                                ) {
                                    return (
                                        <PaginationItem key={i}>
                                            <PaginationLink
                                                href="#"
                                                isActive={isActive}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    table.setPageIndex(i);
                                                }}
                                            >
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                }
                                if (i === currentPage - 2 || i === currentPage + 2)
                                    return <PaginationEllipsis key={`ellipsis-${i}`} />;
                                return null;
                            })}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        table.nextPage();
                                    }}
                                    disabled={!table.getCanNextPage()}
                                    className={!table.getCanNextPage() ? "pointer-events-none opacity-50" : ""}
                                />

                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </div>
    );
}
