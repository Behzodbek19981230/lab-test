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

import classnames from 'classnames'

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
    testCode: '12/45-K-2024',
    address: '25',
    data1: '25',
    data2: '25',
    data3: '25'
  },
  {
    id: 2,
    invoiceStatus: 'Ko`rib chiqilyapti',
    name: 'Sinov uslubi bo`yicha me`yoriy hujjat raqami',
    code: '12/45-K-2024',
    objName: '',
    testCode: '12/45-K-2024',
    address: '25',
    data1: '25',
    data2: '25',
    data3: '25'
  }
]

const columnHelper = createColumnHelper<any>()

const RoomsTable = () => {
  const [rowSelection, setRowSelection] = useState({})
  const [data] = useState(...[dataTable])
  const [filteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo<ColumnDef<any, any>[]>(
    () => [
      columnHelper.accessor('invoiceStatus', {
        header: 'Pozitsiya kodi ',
        cell: () => <Typography>2</Typography>
      }),
      columnHelper.accessor('id', {
        header: () => (
          <Typography className='w-[200px] text-wrap'>Sinovlar amalga oshiriladigan honalar nomi</Typography>
        ),
        cell: () => <Typography className='w-[200px] text-wrap'>209 kimyoviy sinash honasi</Typography>
      }),
      columnHelper.accessor('name', {
        header: () => <Typography className='w-[50px] text-wrap'>Maydoni, m ² </Typography>,
        cell: () => <Typography className='w-[50px] text-wrap'>45</Typography>
      }),
      {
        id: 'group-header',
        header: () => (
          <Typography className={classnames(tableStyles['group-header'], 'w-[450px] text-wrap')}>
            Texnik talablar, usullar va proseduralarda belgilangan, yoki ular (sharoitlar) natijalarning ishonchliligiga
            ta’sir qiladigan holatlardagi ko’rsatgichlar
          </Typography>
        ),
        columns: [
          columnHelper.accessor('data1', {
            header: () => (
              <Typography className={classnames(tableStyles['group-header-border'], 'w-[100px] text-wrap ')}>
                ko’rsatgich nomi
              </Typography>
            ),
            cell: () => <Typography>Atmosfera bosimi</Typography>
          }),
          columnHelper.accessor('data2', {
            header: () => <span className={tableStyles['group-header-border']}>me’yor</span>,
            cell: () => <Typography>804-104 kPa</Typography>
          }),
          columnHelper.accessor('data3', {
            header: () => (
              <Typography
                sx={{ textTransform: 'none' }}
                className={classnames(tableStyles['group-header-border'], 'w-[100px] text-wrap')}
              >
                fakt
              </Typography>
            ),
            cell: () => <Typography>966 kPa </Typography>
          })
        ]
      },
      columnHelper.accessor('name', {
        header: () => (
          <Typography className='w-[200px] text-wrap'>
            Maxsus qurilmalarning mavjudligi (ventilatsiya, halaqitlardan himoya va boshqalar)
          </Typography>
        ),
        cell: () => (
          <Typography className='w-[200px] text-wrap'>
            Kondisioner orqali sovutish va markaziy isitish tizimi orqali isitish
          </Typography>
        )
      }),
      columnHelper.accessor('code', {
        header: () => (
          <Typography className='w-[200px] text-wrap'>
            Namunalarni qabul qilish va saqlash sharoiti mavjudligi
          </Typography>
        ),
        cell: () => <Typography className='w-[200px] text-wrap'>Maxsus metal va yog’och tokchalar</Typography>
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

export default RoomsTable
