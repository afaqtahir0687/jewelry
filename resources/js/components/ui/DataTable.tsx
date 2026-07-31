import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';
import { Button } from './button';
import { Input } from './input';
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown } from 'lucide-react';
import type { PaginatedData } from '@/types';

export interface Column<T> {
    header: string;
    accessorKey?: keyof T;
    cell?: (item: T) => React.ReactNode;
    sortable?: boolean;
}

interface DataTableProps<T> {
    data: PaginatedData<T>;
    columns: Column<T>[];
    searchQuery?: string;
    onSearch?: (query: string) => void;
    onSort?: (field: string, direction: 'asc' | 'desc') => void;
    currentSort?: { field: string; direction: 'asc' | 'desc' };
    searchPlaceholder?: string;
}

export function DataTable<T>({ 
    data, 
    columns, 
    searchQuery = '', 
    onSearch,
    onSort,
    currentSort,
    searchPlaceholder = "Search..."
}: DataTableProps<T>) {
    const [searchTerm, setSearchTerm] = useState(searchQuery);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (onSearch && searchTerm !== searchQuery) {
                onSearch(searchTerm);
            }
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [searchTerm, onSearch, searchQuery]);

    const handleSort = (field: string) => {
        if (!onSort) return;
        if (currentSort?.field === field) {
            onSort(field, currentSort.direction === 'asc' ? 'desc' : 'asc');
        } else {
            onSort(field, 'asc');
        }
    };

    const handleNavigation = (url: string | null) => {
        if (url) {
            router.get(url, {}, { preserveState: true, preserveScroll: true });
        }
    };

    return (
        <div className="space-y-4">
            {onSearch && (
                <div className="flex items-center">
                    <div className="relative w-72">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground text-gray-500" />
                        <Input
                            placeholder={searchPlaceholder}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8 bg-white/5 border-white/10 text-white"
                        />
                    </div>
                </div>
            )}
            
            <div className="rounded-md border border-white/10 bg-white/5 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-white/10 hover:bg-transparent">
                            {columns.map((col, i) => (
                                <TableHead 
                                    key={i} 
                                    className={`text-gray-400 ${col.sortable ? "cursor-pointer select-none hover:text-white" : ""}`} 
                                    onClick={() => col.sortable && col.accessorKey && handleSort(String(col.accessorKey))}
                                >
                                    <div className="flex items-center gap-1">
                                        {col.header}
                                        {col.sortable && <ArrowUpDown className="h-3 w-3" />}
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.data.length > 0 ? (
                            data.data.map((item, i) => (
                                <TableRow key={i} className="border-b border-white/10 hover:bg-white/5">
                                    {columns.map((col, j) => (
                                        <TableCell key={j} className="text-gray-300">
                                            {col.cell ? col.cell(item) : col.accessorKey ? String(item[col.accessorKey as keyof T]) : null}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {data.total > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
                    <div className="text-sm text-gray-400">
                        Showing {data.from} to {data.to} of {data.total} results
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-white/10 bg-transparent text-gray-400 hover:bg-white/10 hover:text-white"
                            onClick={() => handleNavigation(data.first_page_url)}
                            disabled={data.current_page === 1}
                        >
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-white/10 bg-transparent text-gray-400 hover:bg-white/10 hover:text-white"
                            onClick={() => handleNavigation(data.prev_page_url)}
                            disabled={!data.prev_page_url}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-gray-400 min-w-[5rem] text-center">
                            Page {data.current_page} of {data.last_page}
                        </span>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-white/10 bg-transparent text-gray-400 hover:bg-white/10 hover:text-white"
                            onClick={() => handleNavigation(data.next_page_url)}
                            disabled={!data.next_page_url}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-white/10 bg-transparent text-gray-400 hover:bg-white/10 hover:text-white"
                            onClick={() => handleNavigation(data.last_page_url)}
                            disabled={data.current_page === data.last_page}
                        >
                            <ChevronsRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
