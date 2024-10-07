'use client'

import { useState, useMemo } from 'react'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
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

// Type Imports
import { Button, Menu, MenuItem } from '@mui/material'

import classnames from 'classnames'

import type { ThemeColor } from '@core/types'
import type { InvoiceType } from '@/types/apps/invoiceTypes'
import type { Locale } from '@configs/i18n'

import TablePaginationComponent from '@components/TablePaginationComponent'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type InvoiceTypeWithAction = InvoiceType & {
  action?: string
}
type chipColorType = {
  color: ThemeColor
}

export const chipColor: { [key: string]: chipColorType } = {
  'Ijroga qabul qilingan': { color: 'success' },
  "Ko'rib chiqilyapti": { color: 'primary' },
  Bajarildi: { color: 'warning' },
  'Rad etilgan': { color: 'error' },
  'Ijro etilmagan': { color: 'error' }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  addMeta({
    itemRank
  })

  return itemRank.passed
}

const columnHelper = createColumnHelper<InvoiceTypeWithAction>()

const EnvConditionsNormaList = ({ invoiceData }: { invoiceData?: InvoiceType[] }) => {
  const [rowSelection, setRowSelection] = useState({})
  const [data] = useState(...[invoiceData])
  const [filteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  // Vars
  const open = Boolean(anchorEl)
  const { lang: locale } = useParams()

  const columns = useMemo<ColumnDef<InvoiceTypeWithAction, any>[]>(
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
      columnHelper.accessor('name', {
        header: () => (
          <Typography className='max-w-[200px]  text-wrap text-center'>
            Sinov uslubi bo`yicha me`yoriy hujjat raqami{' '}
          </Typography>
        ),
        cell: ({ row }) => (
          <Typography variant='body2' className='max-w-[200px] text-center'>
            ГОСТ {`${row.original.id}`}
          </Typography>
        )
      }),

      {
        id: 'group-header',
        header: () => <div className={tableStyles['group-header']}>Me`yoriy hujjat bo`yicha o`rnatilgan talab</div>,
        columns: [
          columnHelper.group({
            id: 'harorat',
            header: () => (
              <Typography className={classnames(tableStyles['group-header-border'], 'w-[100px] text-wrap')}>
                Harorat, <sup className='lowercase'>o</sup>C
              </Typography>
            ),
            columns: [
              columnHelper.accessor('companyEmail', {
                header: 'Min',
                cell: () => <Typography>{12}</Typography>
              }),
              columnHelper.accessor('warning', {
                header: 'Max',
                cell: () => <Typography>{25}</Typography>
              })
            ]
          }),
          columnHelper.group({
            id: 'namlik',
            header: () => (
              <Typography className={classnames(tableStyles['group-header-border'], 'w-[150px] text-wrap')}>
                Nisbiy namlik , %
              </Typography>
            ),
            columns: [
              columnHelper.accessor('companyEmail', {
                header: 'Min',
                cell: () => <Typography>{0.46}</Typography>
              }),
              columnHelper.accessor('warning', {
                header: 'Max',
                cell: () => <Typography>{0.8}</Typography>
              })
            ]
          }),

          columnHelper.group({
            id: 'posim',
            header: () => (
              <Typography className={classnames(tableStyles['group-header-border'], 'w-[100px] text-wrap')}>
                Atmosfera bosimi , kPa(mmHg)
              </Typography>
            ),
            columns: [
              columnHelper.accessor('companyEmail', {
                header: 'Min',
                cell: () => <Typography>600</Typography>
              }),
              columnHelper.accessor('warning', {
                header: 'Max',
                cell: () => <Typography>900</Typography>
              })
            ]
          })
        ]
      },

      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton>
              <Link href={getLocalizedUrl(`/applications/${row.original.id}`, locale as Locale)} className='flex'>
                <i className='tabler-eye text-textSecondary' />
              </Link>
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],
    [locale]
  )

  const table = useReactTable({
    data: filteredData as InvoiceType[],
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Card>
      <CardContent className='pb-4'>
        <div className='flex items-center justify-between gap-4 mb-4'>
          <Typography variant='h4'>Artrof muhit sharoitlarining monitoringi</Typography>
          <Typography variant='body2' color='text.secondary'></Typography>
          <Button
            variant='tonal'
            aria-haspopup='true'
            onClick={handleClick}
            color='secondary'
            aria-expanded={open ? 'true' : undefined}
            endIcon={<i className='tabler-upload' />}
            aria-controls={open ? 'user-view-overview-export' : undefined}
          >
            Export
          </Button>
          <Menu open={open} anchorEl={anchorEl} onClose={handleClose} id='user-view-overview-export'>
            <MenuItem onClick={handleClose} className='uppercase'>
              pdf
            </MenuItem>
            <MenuItem onClick={handleClose} className='uppercase'>
              xlsx
            </MenuItem>
            <MenuItem onClick={handleClose} className='uppercase'>
              csv
            </MenuItem>
          </Menu>
        </div>
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    style={{ textTransform: 'none' }}
                    key={header.id}
                    colSpan={header.colSpan}
                    className={header.colSpan > 1 ? ' border' : 'border-l border-r '}
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
      </CardContent>
    </Card>
  )
}

export default EnvConditionsNormaList
