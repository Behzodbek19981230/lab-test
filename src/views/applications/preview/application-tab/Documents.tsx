'use client'

// React Imports
import { useState, useMemo, useEffect } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import { usePathname } from 'next/navigation'

import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

// Third-party Imports
import classnames from 'classnames'
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

// Type Imports

// Util Imports

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import { getDocumentData } from '@/app/server/actions'
import { Spinner } from '@/components/spinner/Spinner'
import type { documentType } from '@/types/types'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

// Column Definitions
const columnHelper = createColumnHelper<any>()

const DocumentsListTable = () => {
  // States
  const [data, setData] = useState<documentType[]>()
  const params = usePathname()
  const show = params.includes('/show/')

  console.log(show)

  // Vars

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocumentData()

      setData(data)
    }

    fetchData()
  }, [])

  // Hooks

  const columns = useMemo<ColumnDef<any, any>[]>(
    () => [
      columnHelper.accessor('total', {
        header: 'Fayl nomi',
        cell: ({ row }) => <Typography>{`${row.original.name}`}</Typography>
      }),
      columnHelper.accessor('issuedDate', {
        header: 'Yuklash sanasi',
        cell: () => <Typography>11.05.2024</Typography>
      }),
      columnHelper.accessor('action', {
        header: 'Yuklab olish',
        cell: () => (
          <div className='flex items-center'>
            <IconButton>
              <Link href='#' className='flex'>
                <i className='tabler-download text-textSecondary' />
              </Link>
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const fuzzyFilter: FilterFn<any> = (row, columnId, value) => {
    const rowValue = row.getValue(columnId)

    return rowValue !== undefined ? String(rowValue).includes(String(value)) : false
  }

  const table = useReactTable({
    data: data as documentType[],
    columns,

    enableRowSelection: true, //enable row selection for all rows
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    filterFns: { fuzzy: fuzzyFilter }
  })

  if (data)
    return (
      <Card>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} {...(header.id === 'action' && { className: 'is-24' })}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <i className='tabler-chevron-up text-xl' />,
                              desc: <i className='tabler-chevron-down text-xl' />
                            }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table
                .getRowModel()
                .rows.slice(0, table.getState().pagination.pageSize)
                .map(row => {
                  return (
                    <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} {...(cell.id.includes('action') && { className: 'is-24' })}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </Card>
    )
  else
    return (
      <>
        <Spinner size={40} />
      </>
    )
}

export default DocumentsListTable
