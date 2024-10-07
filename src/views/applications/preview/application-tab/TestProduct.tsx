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

import type { SelectChangeEvent } from '@mui/material'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem } from '@mui/material'

import tableStyles from '@core/styles/table.module.css'
import { getTestProductData } from '@/app/server/actions'

import CustomTextField from '@/@core/components/mui/TextField'
import CustomChip from '@/@core/components/mui/Chip'
import { Spinner } from '@/components/spinner/Spinner'
import type { testProductType } from '@/types/types'
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'

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

const TestProducts = () => {
  const [data, setData] = useState<testProductType[]>()
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const params = usePathname()
  const show = params.includes('/show/')

  const [category] = useState<{ id: number; title: string }[]>([
    { id: 1, title: 'Safarov Mansur' },
    { id: 2, title: 'Haydarov Nodir' },
    { id: 3, title: 'Qadirov Abdulloh' },
    { id: 4, title: 'Qadirov Said' },
    { id: 5, title: 'Qadirov Abdullayev' },
    { id: 6, title: 'Qadirov Abdullah' },
    { id: 7, title: 'Qadirov Abdullayev' }
  ])

  const [categories2, setCategories2] = useState<string[]>([])

  const handleChange2 = (event: SelectChangeEvent<unknown>) => {
    setCategories2(event.target.value as string[])
  }

  const [state, setState] = useState({
    place: '',
    typeM: '',
    fio: '',
    count: '',
    nameL: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTestProductData()

      setData(data)
    }

    fetchData()
  }, [])

  // Hooks

  const columns = useMemo<ColumnDef<any, any>[]>(
    () => [
      columnHelper.accessor('total', {
        header: () => <Typography className='text-wrap w-[100px]'> Mahsulot nomi</Typography>,
        cell: ({ row }) => <Typography className='text-wrap w-[100px]'>{`${row.original.name}`}</Typography>
      }),

      columnHelper.accessor('issuedDate', {
        header: () => <Typography className='text-wrap w-[100px]'>Mahsulot turi modeli</Typography>,
        cell: ({ row }) => <Typography>{row.original.typeM}</Typography>
      }),
      columnHelper.accessor('issuedDate1', {
        header: 'Mahsulot soni',
        cell: ({ row }) => <Typography>{row.original.count}</Typography>
      }),
      columnHelper.accessor('issuedDate2', {
        header: 'Ijrochi',
        cell: ({ row }) => <Typography>{row.original.fio}</Typography>
      }),

      columnHelper.accessor('issuedDate3', {
        header: () => <Typography className='text-wrap w-[100px]'>Sinov o`tkazish joyi</Typography>,
        cell: ({ row }) => <Typography className='text-wrap w-[100px]'>{row.original.nameL}</Typography>
      }),
      ...(show
        ? []
        : [
            columnHelper.accessor('action', {
              header: 'Harakatlar',
              cell: ({ row }) => (
                <div className='flex items-center'>
                  <IconButton
                    onClick={() => {
                      setOpen(true)
                      setState({
                        ...state,
                        typeM: row.original.typeM,
                        nameL: row.original.nameL,
                        fio: row.original.fio,
                        count: row.original.count,
                        place: row.original.place
                      })
                    }}
                  >
                    <Link href='#' className='flex'>
                      <i className='tabler-pencil text-textSecondary' />
                    </Link>
                  </IconButton>
                </div>
              ),
              enableSorting: false
            })
          ])
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const fuzzyFilter: FilterFn<any> = (row, columnId, value) => {
    const rowValue = row.getValue(columnId)

    return rowValue !== undefined ? String(rowValue).includes(String(value)) : false
  }

  const table = useReactTable({
    data: data as testProductType[],
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
                    fullWidth
                    name='name'
                    label='Mahsulot turi/modeli'
                    autoComplete='off'
                    placeholder='Mahsulot turi/modeli'
                    value={state.typeM}
                    onChange={e => setState({ ...state, typeM: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    select
                    fullWidth
                    placeholder='Ijrochini kiritish'
                    label='Ijrochini kiritish'
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
                    placeholder='Yordamchi ijrochini kiritish'
                    label='Yordamchi ijrochini kiritish'
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
                    {category?.map((category: any) => (
                      <MenuItem key={category.id} value={category.title}>
                        {category.title}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    name='name'
                    type='number'
                    label='Mahsulot soni'
                    autoComplete='off'
                    placeholder='Mahsulot soni'
                    value={state.count}
                    onChange={e => setState({ ...state, count: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    name='nameL'
                    label='Sinov o`tkazish joyi'
                    autoComplete='off'
                    placeholder='Sinov o`tkazish joyi'
                    value={state.nameL}
                    select
                    onChange={e => setState({ ...state, nameL: e.target.value })}
                  >
                    <MenuItem value='Labaratoriyada'>
                      <Typography>Labaratoriyada </Typography>
                    </MenuItem>
                    <MenuItem value='Pudratchida'>
                      <Typography>Pudratchida</Typography>
                    </MenuItem>
                    <MenuItem value='Mahsulot egasi hududida'>
                      <Typography>Mahsulot egasi hududida</Typography>
                    </MenuItem>
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
      </Card>
    )
  else
    return (
      <>
        <Spinner size={40} />
      </>
    )
}

export default TestProducts
