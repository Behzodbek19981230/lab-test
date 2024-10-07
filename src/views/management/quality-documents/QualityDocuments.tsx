'use client'

import { useState, useEffect } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { useDropzone } from 'react-dropzone'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  ListItem,
  Typography,
  CardHeader,
  TableContainer,
  Paper
} from '@mui/material'
import { toast } from 'react-toastify'

import MUITable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import type { InvoiceType } from '@/types/apps/invoiceTypes'
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import CustomTextField from '@/@core/components/mui/TextField'

interface FileProp {
  name: string
  type: string
  size: number
}
interface StateType {
  id: string
  url: string
}

const QualityDocumentsList = ({ invoiceData }: { invoiceData?: InvoiceType[] }) => {
  // States
  const [data] = useState(...[invoiceData])

  // Hooks
  const [fileURL, setFileURL] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [openPDF, setOpenPDF] = useState(false)
  const [fileName, setFileName] = useState('')
  const [error, setError] = useState({ title: '', file: '' })
  const [files, setFiles] = useState<File[]>([])
  const [state, setState] = useState<StateType[]>([])

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

  const handleRemoveFile = (file: FileProp) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)

    setFiles([...filtered])
  }

  useEffect(() => {
    return () => {
      if (fileURL) {
        URL.revokeObjectURL(fileURL) // Clean up the URL when the component unmounts
      }
    }
  }, [fileURL])

  const handleOpen = (row: any) => {
    setOpen(true)
    setState([...state, { id: row.id, url: '' }])
  }

  const onSubmit = (e: any) => {
    e.preventDefault()

    if (!fileName) {
      setError({ ...error, title: 'Fayl nomini kiriting!' })

      return
    } else {
      if (files[0]) {
        if (files[0]) {
          setFileURL(URL.createObjectURL(files[0]))
        }

        setOpen(false)
        setError({ ...error, title: '', file: '' })
      } else setError({ ...error, file: 'Faylni kiriting!' })
    }
  }

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

  return (
    <Card>
      <CardHeader title='Sifat menedjmenti hujjatlari' />
      <CardContent className='flex justify-between flex-col items-start md:items-center md:flex-row gap-4'></CardContent>
      <TableContainer component={Paper}>
        <MUITable sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>T/R</TableCell>
              <TableCell>Hujjat nomi</TableCell>
              <TableCell>Harakatlar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.slice(0, 20).map(row => (
              <TableRow key={row.country}>
                <TableCell>
                  <Typography className='text-sm'>{row.id}</Typography>
                </TableCell>

                <TableCell width={'80%'}>
                  <Typography></Typography>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-3'>
                    {Number(row.id) % 3 ? (
                      <Button
                        startIcon={<i className='tabler-download' />}
                        variant='contained'
                        onClick={() => setOpenPDF(true)}
                      >
                        Ko`rish
                      </Button>
                    ) : (
                      ''
                    )}
                    <Button
                      startIcon={<i className='tabler-upload' />}
                      color='warning'
                      variant='contained'
                      onClick={() => {
                        handleOpen(row)
                      }}
                    >
                      Yuklash
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MUITable>
      </TableContainer>
      <Dialog open={open} onClose={() => setOpen(false)} sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}>
        <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
          <i className='tabler-x' />
        </DialogCloseButton>
        <DialogTitle variant='h4' className='flex flex-col gap-2 text-center p-6 sm:pbs-16 sm:pbe-6 sm:pli-16'>
          Sifat menedjmenti hujjatlari
        </DialogTitle>
        <form onSubmit={onSubmit}>
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
                <Typography className='text-error text-[0.8125rem]'>{error.file}</Typography>
                {fileList}
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  type='text'
                  name='text'
                  autoComplete='off'
                  label='Fayl nomi'
                  onChange={e => setFileName(e.target.value as string)}
                  error={Boolean(error.title)}
                  helperText={error.title}
                />
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
                  setFileName('')
                }}
                type='reset'
              >
                Cancel
              </Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
      <Dialog
        maxWidth='lg'
        open={openPDF}
        onClose={() => setOpenPDF(false)}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogCloseButton onClick={() => setOpenPDF(false)} disableRipple>
          <i className='tabler-x' />
        </DialogCloseButton>

        <Box sx={{ width: 800 }}>
          <embed src='/doc.pdf#view=FitH&navpanes=0' type='application/pdf' width='100%' height='600px' />
        </Box>
      </Dialog>
    </Card>
  )
}

export default QualityDocumentsList
