'use client'

import { useState, useMemo } from 'react'

import Link from 'next/link'
import { useParams } from 'next/navigation'

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

import type { Locale } from '@configs/i18n'

import TablePaginationComponent from '@components/TablePaginationComponent'

import { getLocalizedUrl } from '@/utils/i18n'

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

const AkkreditationTable = () => {
  const [rowSelection, setRowSelection] = useState({})
  const [data] = useState(...[dataTable])
  const [filteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')

  const { lang: locale } = useParams()

  const columns = useMemo<ColumnDef<any, any>[]>(
    () => [
      columnHelper.accessor('id', {
        header: '№',
        cell: ({ row }) => (
          <Typography
            variant='h5'
            sx={{ fontSize: 14 }}
            component={Link}
            href={getLocalizedUrl(`/apps/invoice/preview/${row.original.id}`, locale as Locale)}
            color='primary'
          >{`${row.original.id}`}</Typography>
        )
      }),
      columnHelper.accessor('invoiceStatus', {
        header: 'Pozitsiya kodi',
        cell: () => <Typography>q-2</Typography>
      }),
      columnHelper.accessor('name', {
        header: () => (
          <Typography className='w-[220px]  text-wrap text-center'>
            Aniqlanayotgan tavsiflar(parametirlar) nomi/olib boriladigan ishlar
          </Typography>
        ),
        cell: () => (
          <Typography variant='body2' className='w-[220px]  text-wrap text-center'>
            Массовая концентрация элементов: Aлюминий (Al), сурьмы (Sb), мышьяк (As), барий (Ba), меди (Cu), бериллия
            (Be),висмута (Bi), бора (B), железа (Fe), серебра (Ag). )), кадмий (Cd), кальций (Ca), олово (Sn), хром
            (Cr), кобальт (Co), свинец (Pb), литий (Li), магний (Mg), марганец (Mn), молибден ( Mo) ), никель (Ni),
            фосфор (P), калий (K), селен (Se), кремний (Si), натрий (Na), сера (S), стронций (Sr), титан (Ti), ванадий (
            V), Цинк (Zn).{' '}
          </Typography>
        )
      }),
      columnHelper.accessor('code', {
        header: () => (
          <Typography className='w-[200px]  text-wrap text-center'>
            Bandlar ko‘rsatilgan holda sinov/namunalar saralab olish usulining belgilanishi{' '}
          </Typography>
        ),
        cell: () => (
          <Typography variant='body2' className='text-center w-[200px]  text-wrap'>
            ГОСТ Р 57165-2016 (ISO 11855:2007). 9.12, 9.13 b{' '}
          </Typography>
        )
      }),
      columnHelper.accessor('objName', {
        header: () => <Typography className='w-[220px]  text-wrap text-center'>Sinovlar obyektining nomi </Typography>,
        cell: () => (
          <Typography variant='body2' className='text-center'>
            СИловые трансформаторы
          </Typography>
        )
      }),
      columnHelper.accessor('testCode', {
        header: () => <Typography className='w-[220px]  text-wrap text-center'>Sinov kodi </Typography>,
        cell: () => (
          <Typography variant='body2' className='text-center'>
            Y.02/SL.04/7/2{' '}
          </Typography>
        )
      })
    ],
    [locale]
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

export default AkkreditationTable
