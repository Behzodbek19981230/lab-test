'use client'

import { useState, useEffect, useMemo } from 'react'

import Link from 'next/link'

import { useParams } from 'next/navigation'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
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
import {
  Box,
  Button,
  CardHeader,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  ListItem
} from '@mui/material'

import { toast } from 'react-toastify'

import { useDropzone } from 'react-dropzone'

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
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'

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
interface FileProp {
  name: string
  type: string
  size: number
}
export const chipColor: { [key: string]: chipColorType } = {
  'Ijroga qabul qilingan': { color: 'success' },
  '1': { color: 'warning' },
  '3': { color: 'warning' },
  '2': { color: 'error' },
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

const OutgoingList = ({ invoiceData }: { invoiceData?: InvoiceType[] }) => {
  // States
  const [status] = useState<InvoiceType['invoiceStatus']>('')
  const [rowSelection, setRowSelection] = useState({})
  const [data] = useState(...[invoiceData])
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  // Hooks
  const { lang: locale } = useParams()

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 2000000, // 2 MB limit
    accept: {
      'application/pdf': ['.pdf']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    },
    onDropRejected: () => {
      toast.error('You can only upload 2 files with a maximum size of 2 MB.')
    }
  })

  const fileList = files.map((file: FileProp) => (
    <ListItem key={file.name} className='w-100 justify-between border rounded'>
      <div className='flex items-center '>
        <div>
          <Typography className='file-name font-semibold'>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? (Math.round(file.size / 100) / 10000).toFixed(1) + `mb`
              : (Math.round(file.size / 100) / 10).toFixed(1)}{' '}
            kb
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <i className='tabler-trash' />
      </IconButton>
    </ListItem>
  ))

  const handleRemoveFile = (file: FileProp) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i: any) => i.name !== file.name)

    setFiles([...filtered])
  }

  const columns = useMemo<ColumnDef<InvoiceTypeWithAction, any>[]>(
    () => [
      columnHelper.accessor('id', {
        header: 'T/R',
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
        header: 'Sana',
        cell: () => <Typography>11.05.2024</Typography>
      }),

      columnHelper.accessor('address', {
        header: 'Murojaat yuboriluvchi',
        cell: () => <Typography>Uzstandart</Typography>
      }),
      columnHelper.accessor('name', {
        header: 'Ijrochi',
        cell: () => <Typography>Daminov Q </Typography>
      }),
      columnHelper.accessor('contact', {
        header: 'Status',
        cell: ({ row }) => (
          <Chip
            className='w-[200px] py-4 text-wrap'
            label={Number(row.original.id) % 3 == 1 ? 'Rad etildi' : `Ko'rib chiqilmoqda`}
            color={Number(row.original.id) % 3 == 1 ? chipColor['2'].color : chipColor['1'].color}
            variant='tonal'
            size='small'
          />
        )
      }),

      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton>
              <Link href={getLocalizedUrl(`/appeals/outgoing/${row.original.id}`, locale as Locale)} className='flex'>
                <i className='tabler-eye text-textSecondary' />
              </Link>
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, filteredData]
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
    const filteredData = data?.filter(invoice => {
      if (status && invoice.invoiceStatus.toLowerCase().replace(/\s+/g, '-') !== status) return false

      return true
    })

    setFilteredData(filteredData)
  }, [status, data, setFilteredData])

  return (
    <Card>
      <CardHeader title='Chiqish xatlari' />
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
        </div>
        <div className='flex flex-col sm:flex-row is-full sm:is-auto items-start sm:items-center gap-4'>
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Search'
            className='is-[250px]'
          />
          {/* <Button
            variant='contained'
            component={Link}
            startIcon={<i className='tabler-plus' />}
            href={getLocalizedUrl('/application/create', locale as Locale)}
            className='is-full sm:is-auto'
          >
            Yaratish
          </Button> */}
          <Button variant='outlined' endIcon={<i className='tabler-upload' />} onClick={() => setOpen(true)}>
            Yuborish
          </Button>
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
          {table.getFilteredRowModel().rows.length === 0 ? (
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
                .rows.slice(0, table.getState().pagination.pageSize)
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
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
        onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
      />
      <Dialog open={open} onClose={() => setOpen(false)} sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}>
        <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
          <i className='tabler-x' />
        </DialogCloseButton>
        <DialogTitle variant='h4' className='flex flex-col gap-2 text-center p-6 sm:pbs-16 sm:pbe-6 sm:pli-16'>
          Yozuvlarni boshqarish
        </DialogTitle>
        <form onSubmit={e => e.preventDefault()}>
          <DialogContent className='overflow-visible pbs-0 p-6 sm:pli-16'>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />
                  <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Box
                      sx={{
                        mb: 8.75,
                        width: 48,
                        height: 48,
                        display: 'flex',
                        borderRadius: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'background.default'
                      }}
                    >
                      <i className='tabler-upload' />
                    </Box>
                    <Typography variant='h4' sx={{ mb: 2.5 }}>
                      Faylni yuklash
                    </Typography>
                  </Box>
                </div>
                {fileList}
              </Grid>
              <Grid item xs={12}>
                <CustomTextField fullWidth type='text' name='text' autoComplete='off' label='Fayl nomi' />
              </Grid>
            </Grid>
            <DialogActions className='justify-center py-4 sm:pbe-16 sm:pli-16'>
              <Button variant='contained' type='submit'>
                Submit
              </Button>
              <Button
                variant='tonal'
                color='secondary'
                onClick={() => {
                  setOpen(false)
                }}
                type='reset'
              >
                Cancel
              </Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
    </Card>
  )
}

export default OutgoingList
