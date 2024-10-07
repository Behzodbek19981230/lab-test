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
import type { SelectChangeEvent } from '@mui/material'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Menu, MenuItem } from '@mui/material'

import classnames from 'classnames'

import type { ThemeColor } from '@core/types'
import type { InvoiceType } from '@/types/apps/invoiceTypes'
import type { Locale } from '@configs/i18n'

import TablePaginationComponent from '@components/TablePaginationComponent'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import CustomTextField from '@/@core/components/mui/TextField'
import CustomChip from '@/@core/components/mui/Chip'

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

const TasksList = ({ invoiceData }: { invoiceData?: InvoiceType[] }) => {
  const [rowSelection, setRowSelection] = useState({})
  const [data] = useState(...[invoiceData])
  const [filteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  // Vars
  const { lang: locale } = useParams()
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)

  const [category] = useState<{ id: number; title: string }[]>([
    { id: 1, title: 'Safarov Mansur' },
    { id: 2, title: 'Haydarov Nodir' },
    { id: 3, title: 'Qadirov Abdulloh' },
    { id: 4, title: 'Qadirov Said' },
    { id: 5, title: 'Qadirov Abdullayev' },
    { id: 6, title: 'Qadirov Abdullah' },
    { id: 7, title: 'Qadirov Abdullayev' }
  ])

  const [categoryTypes] = useState<{ id: number; title: string }[]>([
    { id: 1, title: 'Vazifa1' },
    { id: 2, title: 'Vazifa2' },
    { id: 3, title: 'Vazifa3' },
    { id: 4, title: 'Vazifa4' },
    { id: 5, title: 'Vazifa5' },
    { id: 6, title: 'Vazifa6' },
    { id: 7, title: 'Vazifa7' }
  ])

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8

  const MenuProps = {
    PaperProps: {
      style: {
        width: 250,
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
      }
    }
  }

  const [categories2, setCategories2] = useState<string[]>([])

  const handleChange2 = (event: SelectChangeEvent<unknown>) => {
    setCategories2(event.target.value as string[])
  }

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
      columnHelper.accessor('invoiceStatus', {
        header: () => <Typography className='text-center'>Xodim F.I.O.</Typography>,
        cell: ({ row }) => <Typography className='text-center'>{row.original.name}</Typography>
      }),
      columnHelper.accessor('avatar', {
        header: () => <Typography className='text-center'>Lavozimi</Typography>,
        cell: () => <Typography className='text-center'>Bosh mutaxassis</Typography>
      }),

      {
        id: 'group-header',
        header: () => <div className={tableStyles['group-header']}>Vazifalar ro’yhati</div>,
        columns: [
          columnHelper.group({
            id: 'harorat',
            header: () => (
              <Typography className={(classnames(tableStyles['group-header-border']), 'text-center')}>
                Vazifa 1
              </Typography>
            ),

            cell: () => <Typography className='text-center'>+</Typography>
          }),
          columnHelper.group({
            id: 'harorat2',
            header: () => (
              <Typography className={(classnames(tableStyles['group-header-border']), 'text-center')}>
                Vazifa 2
              </Typography>
            ),

            cell: () => <Typography className='text-center'>+</Typography>
          }),
          columnHelper.group({
            id: 'harorat3',
            header: () => (
              <Typography className={(classnames(tableStyles['group-header-border']), 'text-center')}>
                Vazifa 3
              </Typography>
            ),

            cell: () => <Typography className='text-center'>+</Typography>
          }),
          columnHelper.group({
            id: 'harorat4',
            header: () => (
              <Typography className={(classnames(tableStyles['group-header-border']), 'text-center')}>
                Vazifa 4
              </Typography>
            ),

            cell: () => <Typography className='text-center'>+</Typography>
          }),
          columnHelper.group({
            id: 'harorat5',
            header: () => (
              <Typography className={(classnames(tableStyles['group-header-border']), 'text-center')}>
                Vazifa 5
              </Typography>
            ),

            cell: () => <Typography className='text-center'>+</Typography>
          }),
          columnHelper.group({
            id: 'harorat6',
            header: () => (
              <Typography className={(classnames(tableStyles['group-header-border']), 'text-center')}>
                Vazifa 6
              </Typography>
            ),

            cell: () => <Typography className='text-center'>+</Typography>
          })
        ]
      },

      columnHelper.accessor('action', {
        header: () => <Typography className='text-center'>Amallar</Typography>,

        cell: () => (
          <div className='flex items-center justify-center'>
            <IconButton>
              <Link href={'#'} className='flex' onClick={() => setOpen(true)}>
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

  return (
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
        </div>
        <TablePaginationComponent table={table} />
        <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}>
          <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
            <i className='tabler-x' />
          </DialogCloseButton>
          <DialogTitle
            variant='h4'
            className='flex flex-col gap-2 text-center p-6 sm:pbs-16 sm:pbe-6 sm:pli-16'
          ></DialogTitle>
          <form onSubmit={e => e.preventDefault()}>
            <DialogContent className='overflow-visible pbs-0 p-6 sm:pli-16'>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <CustomTextField
                    select
                    fullWidth
                    placeholder='Xodim FIO'
                    label='Xodim FIO'
                    id='select-multiple-chip-1'
                  >
                    {category?.map((category: any) => (
                      <MenuItem key={category.id} value={category.title}>
                        {category.title}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    select
                    fullWidth
                    placeholder='Vazifani tanlash'
                    label='Vazifani tanlash'
                    id='select-multiple-chip'
                    SelectProps={{
                      MenuProps,
                      multiple: true,
                      value: categories2,
                      onChange: e => handleChange2(e),
                      renderValue: selected => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                          {(selected as unknown as string[])?.map(value => (
                            <CustomChip key={value} label={value} sx={{ m: 0.75 }} color='primary' />
                          ))}
                        </Box>
                      )
                    }}
                  >
                    {categoryTypes?.map((category: any) => (
                      <MenuItem key={category.id} value={category.title}>
                        {category.title}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions className='justify-center pbs-0 p-6 sm:pbe-16 sm:pli-16'>
              <Button variant='contained' type='submit' onClick={handleClose}>
                {data ? 'Update' : 'Submit'}
              </Button>
              <Button variant='tonal' type='reset' color='secondary' onClick={handleClose}>
                Cancel
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </CardContent>
    </Card>
  )
}

export default TasksList
