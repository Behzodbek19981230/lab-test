'use client'

import { useState, useMemo } from 'react'

import Typography from '@mui/material/Typography'

import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

import TablePaginationComponent from '@components/TablePaginationComponent'

import tableStyles from '@core/styles/table.module.css'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  addMeta({
    itemRank
  })

  return itemRank.passed
}

const dataTable = [
  {
    id: 1,
    invoiceStatus: 'Ijroga qabul qilingan',
    name: 'Sinov uslubi bo`yicha me`yoriy hujjat raqami',
    code: '12/45-K-2024',
    objName: '',
    testCode: '12/45-K-2024'
  },
  {
    id: 2,
    invoiceStatus: 'Ko`rib chiqilyapti',
    name: 'Sinov uslubi bo`yicha me`yoriy hujjat raqami',
    code: '12/45-K-2024',
    objName: '',
    testCode: '12/45-K-2024'
  }
]

const columnHelper = createColumnHelper<any>()

const ResurcesTable = () => {
  const [rowSelection, setRowSelection] = useState({})
  const [data] = useState(...[dataTable])
  const [filteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo<ColumnDef<any, any>[]>(
    () => [
      columnHelper.accessor('invoiceStatus', {
        header: 'Akkreditatsiya sohasidagi pozitsiya kodi ',
        cell: () => <Typography>2</Typography>
      }),
      columnHelper.accessor('id', {
        header: 'Personal bilan ta’minlanganligi  ',
        cell: () => <Typography>3</Typography>
      }),
      columnHelper.accessor('name', {
        header: 'Honalar va atrof muhit sharoitlari bilan ta`minlanganligi ',
        cell: () => <Typography>2</Typography>
      }),
      columnHelper.accessor('code', {
        header: 'Texnik vositalar bilan ta’minlanganligi  ',
        cell: () => <Typography>1,2,5</Typography>
      })
    ],
    []
  )

  const table = useReactTable({
    data: filteredData as any[],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return (
    <div className='overflow-x-auto'>
      <table className={tableStyles.table}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  style={{ textTransform: 'none' }}
                  key={header.id}
                  colSpan={header.colSpan}
                  className={header.colSpan == 3 ? ' border' : 'border-l border-r '}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className='border border-t-0'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <TablePaginationComponent table={table} />
    </div>
  )
}

export default ResurcesTable
