'use client';

import { useFindServicesQuery } from '@/lib/features/service/servicesApi';
import { Service } from '@/lib/features/service/types';
import { Button } from '@repo/ui/components/button';
import { ButtonGroup } from '@repo/ui/components/button-group';
import { Card, CardContent, CardHeader } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/table';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import debounce from 'lodash.debounce';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import React from 'react';

const ServiceList = () => {
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data } = useFindServicesQuery({
    search: globalFilter,
    pagination,
  });

  const debouncedFilter = React.useMemo(
    () => debounce((value: string) => setGlobalFilter(value), 300),
    [],
  );

  const columns = React.useMemo<ColumnDef<Service, any>[]>(
    () => [
      {
        accessorFn: (row) => row.title,
        id: 'title',
        cell: ({ row }) => (
          <div className="flex flex-col gap-px">
            <span> {row.original.title}</span>
            <span>{row.original.description}</span>
          </div>
        ),
        header: () => <span>Title</span>,
      },
      {
        accessorFn: (row) => row.category,
        id: 'category',
        cell: (info) => info.getValue(),
        header: () => <span>Category</span>,
      },
      {
        accessorFn: (row) => row.price,
        id: 'price',
        cell: (info) => info.getValue(),
        header: () => <span>Price</span>,
      },
      {
        accessorFn: (row) => row.createdAt,
        id: 'createdAt',
        cell: (info) => info.getValue(),
        header: () => <span>Created</span>,
      },
    ],
    [],
  );

  const table = useReactTable({
    data: data?.payload.data ?? [],
    rowCount: data?.payload.total ?? 0,
    columns,
    state: {
      globalFilter,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  return (
    <Card>
      <CardHeader>
        <Input
          value={globalFilter ?? ''}
          onChange={(e) => debouncedFilter(String(e.target.value))}
        />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          </div>
                        </>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount().toLocaleString()}
            </strong>
          </span>
          <ButtonGroup>
            <ButtonGroup>
              <Button
                onClick={() => table.firstPage()}
                disabled={!table.getCanPreviousPage()}
                size="icon"
              >
                <ChevronsLeft />
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                size="icon"
              >
                <ChevronLeft />
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                size="icon"
              >
                <ChevronRight />
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button
                onClick={() => table.lastPage()}
                disabled={!table.getCanNextPage()}
                size="icon"
              >
                <ChevronsRight />
              </Button>
            </ButtonGroup>
          </ButtonGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceList;
