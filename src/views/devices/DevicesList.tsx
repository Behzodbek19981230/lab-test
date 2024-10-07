'use client'

import { useState, useEffect, useMemo } from 'react'

import Link from 'next/link'

import { useParams } from 'next/navigation'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import TablePagination from '@mui/material/TablePagination'
import type { TextFieldProps } from '@mui/material/TextField'

import classnames from 'classnames'
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

import type { ThemeColor } from '@core/types'
import type { InvoiceType } from '@/types/apps/invoiceTypes'
import type { Locale } from '@configs/i18n'

// Component Imports
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import { getInvoiceData } from '@/app/server/actions'
import OptionMenu from '@/@core/components/option-menu'

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
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

const columnHelper = createColumnHelper<InvoiceTypeWithAction>()

const DevicesListTable = () => {
  // States
  const [status, setStatus] = useState<InvoiceType['invoiceStatus']>('')
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState<InvoiceType[]>([])
  const [globalFilter, setGlobalFilter] = useState('')

  // Hooks
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
        header: () => <Typography>Qurilma/vosita nomi</Typography>,
        cell: () => <Typography></Typography>
      }),

      columnHelper.accessor('address', {
        header: 'Turi',
        cell: () => <Typography>SK-1237543/1-22</Typography>
      }),
      columnHelper.accessor('balance', {
        header: 'Zavod raqami',
        cell: () => <Typography>SK-1237543/1-22</Typography>
      }),
      columnHelper.accessor('companyEmail', {
        header: () => <Typography>Tekshiruv hujjati raqami</Typography>,
        cell: () => <Typography>SK-1237543/1-22</Typography>
      }),
      columnHelper.accessor('dueDate', {
        header: 'Sanasi',
        cell: () => <Typography>27.09.2024</Typography>
      }),
      columnHelper.accessor('warning', {
        header: 'Muddat',
        cell: () => <Typography>27.10.2024</Typography>
      }),
      columnHelper.accessor('company', {
        header: 'Mas`ul shaxs F.I.O',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <div className='flex flex-col'>
              <Typography className='font-medium' color='text.primary'>
                {row.original.name}
              </Typography>
            </div>
          </div>
        )
      }),

      columnHelper.accessor('action', {
        header: 'Harakatlar',
        cell: () => (
          <div className='flex items-center'>
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'Bayonnomani yuklab olish',
                  href: getLocalizedUrl(`/only-office`, locale as Locale)
                },
                {
                  text: 'Dalolatnomani yuklab olish',
                  href: getLocalizedUrl(`/only-office`, locale as Locale)
                },
                {
                  text: 'Guvohnomani yuklab olish',
                  href: getLocalizedUrl(`/only-office`, locale as Locale)
                }
              ]}
            />
          </div>
        )
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  )

  const fetchData = async () => {
    const res = await getInvoiceData()

    setData(res)
  }

  const table = useReactTable({
    data: data as InvoiceType[],
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
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
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

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Card>
        <CardContent className='flex justify-between flex-col items-start md:items-center md:flex-row gap-4'>
          <div className='flex items-center justify-between gap-4'>
            <div className='flex items-center gap-2'>
              <Typography className='hidden sm:block'>Show</Typography>
              <CustomTextField
                select
                value={table.getState().pagination.pageSize}
                onChange={e => table.setPageSize(Number(e.target.value))}
                className='is-[70px]'
              >
                <MenuItem value='10'>10</MenuItem>
                <MenuItem value='25'>25</MenuItem>
                <MenuItem value='50'>50</MenuItem>
              </CustomTextField>
            </div>
            {/* <Button
            variant='contained'
            component={Link}
            startIcon={<i className='tabler-plus' />}
            href={getLocalizedUrl('apps/invoice/add', locale as Locale)}
            className='is-full sm:is-auto'
          >
            Create Invoice
          </Button> */}
          </div>
          <div className='flex flex-col sm:flex-row is-full sm:is-auto items-start sm:items-center gap-4'>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Search'
              className='is-[250px]'
            />
            <CustomTextField
              select
              id='select-status'
              value={status}
              onChange={e => setStatus(e.target.value)}
              className='is-[160px]'
              SelectProps={{ displayEmpty: true }}
            >
              <MenuItem value=''> Status</MenuItem>
              <MenuItem value='downloaded'>Downloaded</MenuItem>
              <MenuItem value='draft'>Draft</MenuItem>
              <MenuItem value='paid'>Paid</MenuItem>
              <MenuItem value='partial-payment'>Partial Payment</MenuItem>
              <MenuItem value='past-due'>Past Due</MenuItem>
              <MenuItem value='sent'>Sent</MenuItem>
            </CustomTextField>
          </div>
        </CardContent>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
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
            {table.getFilteredRowModel().rows?.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No data available
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows?.slice(0, table.getState().pagination.pageSize)
                  .map(row => {
                    return (
                      <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    )
                  })}
              </tbody>
            )}
          </table>
        </div>
        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows?.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
          onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
        />
      </Card>
    </>
  )
}

export default DevicesListTable
