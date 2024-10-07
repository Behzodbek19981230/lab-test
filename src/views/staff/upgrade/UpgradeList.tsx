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
import { Button, Grid, Menu, MenuItem } from '@mui/material'

import classnames from 'classnames'

import type { ThemeColor } from '@core/types'
import type { InvoiceType } from '@/types/apps/invoiceTypes'
import type { Locale } from '@configs/i18n'

import TablePaginationComponent from '@components/TablePaginationComponent'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import BossInfoCard from '@/views/staff/BossInfoCard'

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

const UpgradeList = ({ invoiceData }: { invoiceData?: InvoiceType[] }) => {
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
      columnHelper.accessor('dueDate', {
        header: 'Lavozim ',
        cell: () => <Typography>Bosh mutaxassis</Typography>
      }),

      columnHelper.accessor('invoiceStatus', {
        header: 'Xodim F.I.O.',
        cell: ({ row }) => <Typography>{row.original.name}</Typography>
      }),

      {
        id: 'group-header',
        header: () => (
          <div className={classnames(tableStyles['group-header'], 'text-wrap')}>
            Ichki tartibda malaka oshirish mavzulari reja tartibi
          </div>
        ),
        columns: [
          columnHelper.group({
            id: 'harorat',
            header: () => (
              <Typography className={classnames(tableStyles['group-header-border'])}>Mavzu va yo’nalishlar</Typography>
            ),

            cell: () => <Typography>O’lchash noaniqliklari</Typography>
          }),
          columnHelper.group({
            id: 'harorat2',
            header: () => <Typography className={classnames(tableStyles['group-header-border'])}>Sanasi</Typography>,

            cell: () => <Typography>01.03.2024</Typography>
          })
        ]
      },
      columnHelper.accessor('avatarColor', {
        header: 'Natija',
        cell: () => <Typography>Bayonnoma № </Typography>
      }),
      columnHelper.accessor('companyEmail', {
        header: () => (
          <Typography className='text-center text-wrap max-w-44'>Tashqi resurslarda malaka oshirish rejasi</Typography>
        ),
        cell: () => <Typography>Standartlar instituti</Typography>
      }),
      columnHelper.accessor('contact', {
        header: 'Sana',
        cell: () => <Typography>01.03.2024</Typography>
      }),
      {
        id: 'group-header-1',
        header: () => <div className={classnames(tableStyles['group-header'], 'text-center')}>Natija</div>,
        columns: [
          columnHelper.group({
            id: 'harorat1',
            header: () => (
              <Typography className={classnames(tableStyles['group-header-border'], 'text-center text-wrap max-w-44')}>
                Malaka oshirganlik hujjati raqami
              </Typography>
            ),

            cell: () => <Typography></Typography>
          }),
          columnHelper.group({
            id: 'harorat22',
            header: () => <Typography className={classnames(tableStyles['group-header-border'])}>Sanasi</Typography>,

            cell: () => <Typography>01.03.2024</Typography>
          }),
          columnHelper.group({
            id: 'harorat23',
            header: () => <Typography className={classnames(tableStyles['group-header-border'])}>Muddati </Typography>,

            cell: () => <Typography>01.03.2024</Typography>
          })
        ]
      },

      columnHelper.accessor('action', {
        header: () => <Typography className='text-center'>Action</Typography>,

        cell: ({ row }) => (
          <div className='flex items-center justify-center'>
            <IconButton>
              <Link href={getLocalizedUrl(`/applications/${row.original.id}`, locale as Locale)} className='flex'>
                <i className='tabler-pencil text-textSecondary' />
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
    <Grid container gap={4}>
      <Grid item xs={12}>
        <BossInfoCard />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent className='pb-4'>
            <div className='flex items-center justify-between gap-4 mb-4'>
              <Typography variant='h4'>Laboratoriya hodimlar vazifalarining taqsimlash jadvali</Typography>
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
                          className={header.colSpan > 1 ? ' border' : 'border-l border-r '}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
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
            </div>
            <TablePaginationComponent table={table} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default UpgradeList
