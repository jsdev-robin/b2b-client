'use client';
import { Button } from '@repo/ui/components/button';
import IndeterminateCheckbox from '@repo/ui/components/indeterminate-checkbox';
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
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, ChevronRight } from 'lucide-react';
import React from 'react';

type ProductVariant = {
  title: string;
  sku: string;
  price: number;
  inventory: number;
  weight: number;
  status: 'active' | 'draft' | 'archived';
  subRows?: ProductVariant[];
};

const data: ProductVariant[] = [
  {
    title: 'Black',
    sku: 'COLOR-BLACK',
    price: 0,
    inventory: 0,
    weight: 0,
    status: 'active',
    subRows: [
      {
        title: 'Black / S / Cotton',
        sku: 'TSH-BLK-S-COT',
        price: 25,
        inventory: 120,
        weight: 200,
        status: 'active',
      },
      {
        title: 'Black / M / Cotton',
        sku: 'TSH-BLK-M-COT',
        price: 25,
        inventory: 90,
        weight: 210,
        status: 'active',
      },
      {
        title: 'Black / L / Cotton',
        sku: 'TSH-BLK-L-COT',
        price: 25,
        inventory: 60,
        weight: 220,
        status: 'active',
      },
    ],
  },
  {
    title: 'White',
    sku: 'COLOR-WHITE',
    price: 0,
    inventory: 0,
    weight: 0,
    status: 'active',
    subRows: [
      {
        title: 'White / S / Cotton',
        sku: 'TSH-WHT-S-COT',
        price: 25,
        inventory: 130,
        weight: 200,
        status: 'active',
      },
      {
        title: 'White / M / Cotton',
        sku: 'TSH-WHT-M-COT',
        price: 25,
        inventory: 110,
        weight: 210,
        status: 'active',
      },
      {
        title: 'White / L / Cotton',
        sku: 'TSH-WHT-L-COT',
        price: 25,
        inventory: 70,
        weight: 220,
        status: 'active',
      },
    ],
  },
  {
    title: 'Red',
    sku: 'COLOR-RED',
    price: 0,
    inventory: 0,
    weight: 0,
    status: 'active',
    subRows: [
      {
        title: 'Red / S / Polyester',
        sku: 'TSH-RED-S-POL',
        price: 22,
        inventory: 80,
        weight: 190,
        status: 'draft',
      },
      {
        title: 'Red / M / Polyester',
        sku: 'TSH-RED-M-POL',
        price: 22,
        inventory: 60,
        weight: 195,
        status: 'draft',
      },
      {
        title: 'Red / L / Polyester',
        sku: 'TSH-RED-L-POL',
        price: 22,
        inventory: 40,
        weight: 200,
        status: 'draft',
      },
    ],
  },
];

const ProductVariantsGroupForm = () => {
  const columns = React.useMemo<ColumnDef<ProductVariant>[]>(
    () => [
      {
        accessorKey: 'title',
        header: ({ table }) => (
          <div className="flex items-center">
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />
            <span className="ml-2">Variant</span>
            <Button
              {...{
                onClick: table.getToggleAllRowsExpandedHandler(),
                type: 'button',
                variant: 'link',
                size: 'sm',
              }}
            >
              {table.getIsAllRowsExpanded() ? 'Expand all' : 'Collapse all'}
            </Button>{' '}
          </div>
        ),
        cell: ({ row, getValue }) => (
          <div style={{ paddingLeft: `${row.depth * 2}rem` }}>
            <div>
              <IndeterminateCheckbox
                {...{
                  checked: row.getIsSelected(),
                  indeterminate: row.getIsSomeSelected(),
                  onChange: row.getToggleSelectedHandler(),
                }}
              />{' '}
              {row.getCanExpand() ? (
                <Button
                  onClick={row.getToggleExpandedHandler()}
                  style={{ cursor: 'pointer' }}
                  type="button"
                  size="icon-xs"
                  variant="ghost"
                >
                  {row.getIsExpanded() ? <ChevronDown /> : <ChevronRight />}
                </Button>
              ) : null}{' '}
              {getValue<string>()}
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'price',
        header: () => 'Price',
        cell: () => <Input />,
      },
      {
        accessorKey: 'Available',
        header: () => 'Available',
        cell: () => <Input />,
      },
    ],
    [],
  );

  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    state: { expanded, rowSelection },
    onExpandedChange: setExpanded,
    onRowSelectionChange: setRowSelection,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,
  });

  // const selected = Object.keys(rowSelection)
  //   .filter((id) => rowSelection[id])
  //   .map((id) => table.getRow(id)?.original)
  //   .filter(Boolean);

  // console.log(selected);
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
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
  );
};

export default ProductVariantsGroupForm;
