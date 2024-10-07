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

import {
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Switch
} from '@mui/material'

import tableStyles from '@core/styles/table.module.css'
import { getProductData } from '@/app/server/actions'
import { Spinner } from '@/components/spinner/Spinner'

import CustomTextField from '@/@core/components/mui/TextField'
import type { productType } from '@/types/types'
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

const Products = () => {
  const [data, setData] = useState<productType[]>()
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const params = usePathname()
  const show = params.includes('/show/')

  const [state, setState] = useState({
    docM: '',
    docN: '',
    able: 'no'
  })

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProductData()

      setData(data)
    }

    fetchData()
  }, [])

  // Hooks

  const columns = useMemo<ColumnDef<any, any>[]>(
    () => [
      columnHelper.accessor('total', {
        header: 'Mahsulot nomi',
        cell: ({ row }) => <Typography>{`${row.original.name}`}</Typography>
      }),
      columnHelper.accessor('asasa', {
        header: 'Sinov turi',
        cell: () => <Typography></Typography>
      }),
      columnHelper.accessor('name', {
        header: () => <div className='text-wrap w-40'>Sinov o`tkazish imkoniyati</div>,
        cell: ({ row }) => (
          <>
            {row.original.able == 'not' ? (
              <Chip color='warning' label='Pudratchi tavsiya etiladi' />
            ) : (
              <Switch defaultChecked={row.original.able == 'yes'} />
            )}
          </>
        )
      }),
      columnHelper.accessor('asasa1', {
        header: 'Davomiyligi,(h)',
        cell: () => <Typography></Typography>
      }),
      columnHelper.accessor('contact', {
        header: 'Me`yoriy hujjat',
        cell: ({ row }) => <Typography>{row.original.docM}</Typography>
      }),
      columnHelper.accessor('issuedDate', {
        header: 'Hujjat bandi',
        cell: ({ row }) => <Typography>{row.original.docN}</Typography>
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
                      setState({ ...state, docM: row.original.docM, docN: row.original.docN, able: row.original.able })
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
    data: data as productType[],
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
                    name='number'
                    autoComplete='off'
                    label='Meyoriy hujjat'
                    placeholder='Meyoriy hujjat'
                    value={state.docM}
                    onChange={e => setState({ ...state, docM: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    name='name'
                    label='Hujjat bandi'
                    autoComplete='off'
                    placeholder='Hujjat bandi'
                    value={state.docN}
                    onChange={e => setState({ ...state, docN: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        defaultChecked={state.able == 'yes'}
                        onChange={() => setState({ ...state, able: state.able == 'no' ? 'yes' : 'no' })}
                      />
                    }
                    label='Sinov o`tkazish imkoniyati'
                  />
                </Grid>
                {state.able != 'no' ? (
                  <Grid item xs={12}>
                    <FormControlLabel control={<Checkbox />} label='Pudratchi tavsiya etiladi' />
                  </Grid>
                ) : (
                  ''
                )}
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

export default Products
