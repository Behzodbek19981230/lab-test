// React Imports
import { useState } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material'

import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import CustomTextField from '@/@core/components/mui/TextField'

const PreviewActions = ({ onButtonClick, show }: { onButtonClick: () => void; show: boolean }) => {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<string>('')

  // Hooks

  return (
    <>
      <Card>
        <CardContent className='flex flex-col gap-4'>
          {!show && (
            <Button
              fullWidth
              variant='contained'
              className='capitalize'
              color='success'
              startIcon={<i className='tabler-send' />}
              onClick={() => {
                setOpen(true)
                setState('confirm')
              }}
            >
              Arizani tasdiqlash
            </Button>
          )}

          <Button
            fullWidth
            color='secondary'
            variant='contained'
            className='capitalize'
            startIcon={<i className='tabler-printer' />}
            onClick={onButtonClick}
          >
            Chop etish
          </Button>

          {!show && (
            <Button
              fullWidth
              color='error'
              variant='contained'
              className='capitalize'
              onClick={() => {
                setOpen(true)
                setState('reject')
              }}
            >
              Arizani rad etish
            </Button>
          )}
        </CardContent>
        <Dialog open={open} onClose={() => setOpen(false)} sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}>
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
                    rows={3}
                    multiline
                    label='Sababi'
                    autoComplete='off'
                    placeholder='Sababi'
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions className='justify-center pbs-0 p-6 sm:pbe-16 sm:pli-16'>
              <Button variant='contained' type='submit' onClick={() => setOpen(false)}>
                {state == 'confirm' ? 'Arizani tasdiqlash' : 'Arizani rad etish'}
              </Button>
              <Button variant='tonal' type='reset' color='secondary' onClick={() => setOpen(false)}>
                Bekor qilish
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Card>
    </>
  )
}

export default PreviewActions
