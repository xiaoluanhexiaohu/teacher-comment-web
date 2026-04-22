'use client';

import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';

export function DataTable<T>({ columns, data }: { columns: ColumnDef<T>[]; data: T[] }): JSX.Element {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });
  return <div className="overflow-x-auto rounded-lg border bg-white"><table className="w-full text-sm"><thead>{table.getHeaderGroups().map((hg) => <tr key={hg.id}>{hg.headers.map((h) => <th className="border-b p-2 text-left" key={h.id}>{h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}</th>)}</tr>)}</thead><tbody>{table.getRowModel().rows.map((row) => <tr key={row.id}>{row.getVisibleCells().map((cell) => <td className="border-b p-2" key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>)}</tr>)}</tbody></table></div>;
}
