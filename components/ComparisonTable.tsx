// components/ComparisonTable.tsx
// Accessible comparison table with scope="col", scope="row", caption, and thead

import React from "react"

export interface TableColumn {
  key: string
  header: string
}

export interface TableRow {
  rowHeader: string
  [key: string]: string | number | React.ReactNode
}

interface ComparisonTableProps {
  caption: string
  columns: TableColumn[]
  data: TableRow[]
  className?: string
}

export function ComparisonTable({
  caption,
  columns,
  data,
  className = "",
}: ComparisonTableProps) {
  return (
    <div className={`my-8 overflow-x-auto rounded-xl border border-border bg-card shadow-sm ${className}`}>
      <table className="w-full text-left text-sm">
        <caption className="p-4 text-left font-semibold text-foreground text-base border-b border-border bg-muted/30">
          {caption}
        </caption>
        <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th scope="col" className="px-6 py-4 font-bold text-foreground">
              Feature / Specification
            </th>
            {columns.map((col) => (
              <th key={col.key} scope="col" className="px-6 py-4 font-bold text-foreground">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-muted/20 transition-colors">
              <th scope="row" className="px-6 py-4 font-medium text-foreground whitespace-nowrap">
                {row.rowHeader}
              </th>
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4 text-muted-foreground">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ComparisonTable
