
import React from 'react';

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  className?: string;
}

interface ColumnDef<T> {
  header: string;
  accessorKey: keyof T;
  cell?: (props: { row: T }) => React.ReactNode;
  className?: string;
}

export function DataTable<T>({ data, columns, className }: DataTableProps<T>) {
  return (
    <div className={`overflow-auto ${className}`}>
      <table className="min-w-full divide-y divide-border/40">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th 
                key={index} 
                className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/40">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-primary/5 transition-colors">
              {columns.map((column, colIndex) => (
                <td 
                  key={colIndex} 
                  className={`px-4 py-3 text-sm whitespace-nowrap ${column.className || ''}`}
                >
                  {column.cell ? column.cell({ row }) : String(row[column.accessorKey])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
