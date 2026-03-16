'use client';

import { useFindServicesQuery } from '@/lib/features/service/servicesApi';
import { Service } from '@/lib/features/service/types';
import { Button, buttonVariants } from '@repo/ui/components/button';
import { ButtonGroup } from '@repo/ui/components/button-group';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@repo/ui/components/card';
import { DebouncedInput } from '@repo/ui/components/debounced-input';
import {
  NativeSelect,
  NativeSelectOption,
} from '@repo/ui/components/native-select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/table';
import { cn } from '@repo/ui/lib/utils';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
} from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import ServiceEditAction from './particles/ServiceEditAction';
import ServiceTrashAction from './particles/ServiceTrashAction';

const ServiceList = () => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sort, setSort] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const { data, isError, isLoading } = useFindServicesQuery({
    search: globalFilter,
    pagination,
    sort,
    category,
  });

  const columns = React.useMemo<ColumnDef<Service, unknown>[]>(
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
        cell: ({ row }) =>
          format(parseISO(row.original.createdAt), 'MMM dd, yyyy'),
        header: () => <span>Created</span>,
      },
      {
        id: 'actions',
        header: () => <span>Actions</span>,
        cell: ({ row }) => {
          const service = row.original;

          return (
            <ButtonGroup>
              <ButtonGroup>
                <Link
                  className={cn(
                    buttonVariants({ size: 'icon-sm', variant: 'outline' }),
                  )}
                  href={`/account/dashboard/service/${service._id}`}
                >
                  <Eye />
                </Link>
              </ButtonGroup>
              <ServiceEditAction service={service} />
              <ServiceTrashAction id={service._id} />
            </ButtonGroup>
          );
        },
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
    manualPagination: true,
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
        <div className="flex items-center justify-between gap-4">
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Enter title for search"
          />
          <NativeSelect
            className="w-60"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <NativeSelectOption value="">All Categories</NativeSelectOption>
            <NativeSelectOption value="manufacturing">
              Manufacturing
            </NativeSelectOption>
            <NativeSelectOption value="logistics">Logistics</NativeSelectOption>
            <NativeSelectOption value="it-services">
              IT Services
            </NativeSelectOption>
            <NativeSelectOption value="consulting">
              Consulting
            </NativeSelectOption>
            <NativeSelectOption value="wholesale">Wholesale</NativeSelectOption>
            <NativeSelectOption value="marketing">Marketing</NativeSelectOption>
            <NativeSelectOption value="finance">Finance</NativeSelectOption>
          </NativeSelect>
          <NativeSelect
            className="52"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <NativeSelectOption value="">Default</NativeSelectOption>
            <NativeSelectOption value="-createdAt">Latest</NativeSelectOption>
            <NativeSelectOption value="createdAt">Oldest</NativeSelectOption>
            <NativeSelectOption value="price">
              Price: Low to High
            </NativeSelectOption>
            <NativeSelectOption value="-price">
              Price: High to Low
            </NativeSelectOption>
          </NativeSelect>
        </div>
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
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-red-500"
                >
                  Failed to load services
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No services found
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => {
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
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="w-full justify-between">
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
              size="icon-sm"
            >
              <ChevronsLeft />
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              size="icon-sm"
            >
              <ChevronLeft />
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              size="icon-sm"
            >
              <ChevronRight />
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
              size="icon-sm"
            >
              <ChevronsRight />
            </Button>
          </ButtonGroup>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ServiceList;
