// MUI Imports
import { useState } from 'react'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Style Imports
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton } from '@mui/material'

import tableStyles from '@core/styles/table.module.css'
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import CustomTextField from '@/@core/components/mui/TextField'

type TableDataType = {
  id: number
  fio: string
  position: string
}

// Vars
const tableData: TableDataType[] = [
  {
    fio: 'Saidov Saidmurod',
    id: 1,
    position: 'Yordamchi ijrochi'
  },
  {
    id: 2,
    fio: 'Saidov Saidmurod',
    position: 'Yordamchi ijrochi'
  }
]

const ResponsiblePerson = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      {' '}
      <div className='flex items-center justify-end pt-0 p-4 w-full'>
        <Button
          variant='contained'
          startIcon={<i className='tabler-plus' />}
          className='is-full sm:is-auto'
          onClick={() => setOpen(true)}
        >
          Qo`shish
        </Button>
      </div>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>T/R</th>
              <th>FIO</th>
              <th>Lavozim</th>
              <th></th>
            </tr>
          </thead>
          <tbody className='border-be'>
            {tableData.map((data, index) => (
              <tr key={index}>
                <td>{data.id}</td>
                <td>
                  <Typography color='text.primary' className='max-w-[50%] text-wrap'>
                    {data.fio}
                  </Typography>
                </td>

                <td>
                  <Typography color='text.primary' className='max-w-[50%] text-wrap'>
                    {data.position}
                  </Typography>
                </td>
                <td>
                  <div className='flex items-center'>
                    <IconButton onClick={() => setOpen(true)}>
                      <i className='tabler-pencil text-textSecondary' />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
          Add New
        </DialogTitle>
        <form onSubmit={e => e.preventDefault()}>
          <DialogContent className='pbs-0 sm:pli-16'>
            <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
              <i className='tabler-x' />
            </DialogCloseButton>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <CustomTextField fullWidth label='FIO' name='fio' variant='outlined' />
              </Grid>
              <Grid item xs={12} sm={12}>
                <CustomTextField fullWidth label='Lavozim' name='position' variant='outlined' />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
            <Button variant='contained' onClick={() => setOpen(false)} type='submit'>
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
        </form>
      </Dialog>
    </>
  )
}

export default ResponsiblePerson
