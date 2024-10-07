'use client'

import { useState } from 'react'

import Link from 'next/link'

import { useParams } from 'next/navigation'

import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

// Type Imports
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material'

import type { Locale } from '@configs/i18n'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import CustomTextField from '@/@core/components/mui/TextField'
import TableSimple from '@/components/Table'
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'

export interface ResultsTryingProps {
  id: number
  name: string
  type: string
  number: string
  trying_name: string
  MH: string
  result: string
  no_correct: number
  dep_result: number
  summary: string
}

const ResultsTrying = () => {
  // States
  const data: ResultsTryingProps[] = [
    {
      id: 1,
      name: 'Misli ko’p tolali kuch kabeli ',
      type: 'ВВГ 5х75 mm ²',
      number: '21232343',
      trying_name: ' Elektr izolyatsiya mustahkamligini sinash',
      MH: ' 3 kV, 50 Hz, 1 min.',
      result: ' 50 dan bakand',
      no_correct: 0.1,
      dep_result: 49.3,
      summary: 'Yaroqli'
    },
    {
      id: 2,
      name: 'Misli ko’p tolali kuch kabeli ',
      type: 'ВВГ 5х75 mm ²',
      number: '21232343',
      trying_name: ' Elektr izolyatsiya mustahkamligini sinash',
      MH: ' 3 kV, 50 Hz, 1 min.',
      result: 'Bardoshli',
      no_correct: 0,
      dep_result: 0,
      summary: 'Yaroqli'
    }
  ]

  const [formData, setFormData] = useState<{
    name: string
    type: string
    number: string
    trying_name: string
    MH: string
    result: string
    no_correct: string
    dep_result: string
    summary: string
  }>({
    name: '',
    type: '',
    number: '',
    trying_name: '',
    MH: '',
    result: '',
    no_correct: '',
    dep_result: '',
    summary: ''
  })

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target

    setFormData({ ...formData, [name]: value })
  }

  const [open, setOpen] = useState(false)

  // Hooks
  const { lang: locale } = useParams()

  const columns = [
    {
      accessor: 'id',
      header: () => <div>№</div>,
      cell: (row: ResultsTryingProps) => (
        <Typography
          variant='h5'
          sx={{ fontSize: 14 }}
          component={Link}
          href={getLocalizedUrl(`/apps/invoice/preview/${row?.id}`, locale as Locale)}
          color='primary'
        >{`${row?.id}`}</Typography>
      )
    },
    {
      accessor: 'name',
      header: () => <div className='w-32 text-wrap'> Sinalayotgan maxsulot nomi</div>,
      cell: (row: ResultsTryingProps) => <Typography className='w-32 text-wrap'>{row.name}</Typography>
    },

    {
      accessor: 'type',
      header: () => <div className='w-20 text-wrap'>Turi</div>,
      cell: (row: ResultsTryingProps) => (
        <div className='flex items-center gap-3'>
          <Typography variant='body2' className='w-20 text-wrap'>
            {row.type}
          </Typography>
        </div>
      )
    },
    {
      accessor: 'number',
      header: () => <div className='w-20 text-wrap'> Zavod raqami </div>,
      cell: (row: ResultsTryingProps) => <Typography className='w-20 text-wrap'>{row.number}</Typography>
    },
    {
      accessor: 'trying_name',
      header: () => <div className='w-32 text-wrap'>Sinalayotgan ko’rsatgich nomi</div>,
      cell: (row: ResultsTryingProps) => <Typography className='w-32 text-wrap'>{row.trying_name}</Typography>
    },
    {
      accessor: 'MH',
      header: () => <div className='w-32 text-wrap'>MH talab etilgan me’yor</div>,
      cell: (row: ResultsTryingProps) => <Typography className='w-32 text-wrap'>{row.MH}</Typography>
    },
    {
      accessor: 'result',
      header: () => <div className='w-32 text-wrap'>Sinov natijasi</div>,
      cell: (row: ResultsTryingProps) => <Typography className='w-32 text-wrap'>{row.result}</Typography>
    },
    {
      accessor: 'no_correct',
      header: () => <div className='w-32 text-wrap'>O’lchashlar noaniqligi</div>,
      cell: (row: ResultsTryingProps) => <Typography className='w-32 text-wrap'>{row.no_correct}</Typography>
    },
    {
      accessor: 'dep_result',
      header: () => <div className='w-32 text-wrap'>Tayanch qiymat bilan hisobga olingan qiymat</div>,
      cell: (row: ResultsTryingProps) => <Typography className='w-32 text-wrap'>{row.dep_result}</Typography>
    },
    {
      accessor: 'summary',
      header: () => <div className='w-32 text-wrap'>Xulosa</div>,
      cell: (row: ResultsTryingProps) => <Typography className='w-32 text-wrap'>{row.summary}</Typography>
    },

    {
      accessor: 'action',
      header: () => <div> Action</div>,
      cell: () => (
        <div className='flex items-center'>
          <IconButton onClick={() => setOpen(true)}>
            <i className='tabler-pencil text-textSecondary' />
          </IconButton>
        </div>
      )
    }
  ]

  return (
    <>
      <CardContent className='flex justify-between flex-col items-start md:items-center md:flex-row gap-4'>
        <div className='flex items-center justify-end gap-4 w-full'>
          <Button
            variant='contained'
            startIcon={<i className='tabler-plus' />}
            className='is-full sm:is-auto'
            onClick={() => setOpen(true)}
          >
            Qo`shish
          </Button>
        </div>
      </CardContent>
      <div className='overflow-x-auto'>
        <TableSimple columns={columns} data={data} />
      </div>
      <Dialog
        open={open}
        maxWidth='md'
        scroll='body'
        onClose={() => {
          setOpen(false)
        }}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogTitle variant='h4' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
          {data ? 'Edit Address' : 'Add New Address'}
          <Typography component='span' className='flex flex-col text-center'>
            {data ? 'Edit Address for future billing' : 'Add address for billing address'}
          </Typography>
        </DialogTitle>
        <form onSubmit={e => e.preventDefault()}>
          <DialogContent className='pbs-0 sm:pli-16'>
            <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
              <i className='tabler-x' />
            </DialogCloseButton>
            <Grid container spacing={3}>
              {Object.keys(formData).map(key => (
                <Grid item xs={12} sm={6} key={key}>
                  <CustomTextField
                    fullWidth
                    label={key.replace('_', ' ').toUpperCase()}
                    name={key}
                    onChange={handleInputChange}
                    variant='outlined'
                  />
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
            <Button variant='contained' onClick={() => setOpen(false)} type='submit'>
              {data ? 'Update' : 'Submit'}
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
        </form>
      </Dialog>
    </>
  )
}

export default ResultsTrying
