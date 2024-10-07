'use client'

import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Icon Imports

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { Button, IconButton, List, ListItem } from '@mui/material'
import { toast } from 'react-toastify'

interface FileProp {
  name: string
  type: string
  size: number
}

const FileUploaderMulti = ({ title }: { title: string }) => {
  // ** State
  const [files, setFiles] = useState<File[]>([])

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 2,
    maxSize: 2000000,
    multiple: true,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'video/*': ['.mp4', '.avi', '.mkv'],
      'audio/*': ['.mp3', '.wav', '.ogg'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles([...files, ...acceptedFiles])
    },
    onDropRejected: () => {
      toast.error('You can only upload 2 files & maximum size of 2 MB.')
    }
  })

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith('image')) {
      return (
        <img
          width={60}
          height={60}
          alt={file.name}
          className='border p-1 rounded mr-2'
          src={URL.createObjectURL(file as any)}
        />
      )
    }

    if (file.type.startsWith('application/pdf')) {
      return (
        <img width={60} height={60} alt={file.name} className='border p-1 rounded mr-2' src='/images/icons/pdf.png' />
      )
    }

    if (file.type.startsWith('application/msword')) {
      return (
        <img width={60} height={60} alt={file.name} className='border p-1 rounded mr-2' src='/images/icons/doc.png' />
      )
    }

    if (file.type.startsWith('application/vnd.ms-excel')) {
      return (
        <img width={60} height={60} alt={file.name} className='border p-1 rounded mr-2' src='/images/icons/xls.png' />
      )
    }

    if (file.type.startsWith('application/vnd.ms-powerpoint')) {
      return <i className='tabler-file-powerpoint' />
    }

    if (file.type.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      return (
        <img width={60} height={60} alt={file.name} className='border p-1 rounded mr-2' src='/images/icons/doc.png' />
      )
    }

    if (file.type.startsWith('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
      return (
        <img width={60} height={60} alt={file.name} className='border p-1 rounded mr-2' src='/images/icons/xls.png' />
      )
    } else {
      return <i className='tabler-file-description' />
    }
  }

  const handleRemoveFile = (file: FileProp) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)

    setFiles([...filtered])
  }

  const fileList = files.map((file: FileProp) => (
    <ListItem key={file.name} className='w-100 justify-between border rounded'>
      <div className='flex items-center '>
        <div className='file-preview'>{renderFilePreview(file)}</div>
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

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  return (
    <Fragment>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <div className='border flex items-center justify-center w-full flex-col border-dashed p-6 rounded'>
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
            {title}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Allowed * </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Max 2 files and max size of 2 MB</Typography>
        </div>
      </div>
      {files.length ? (
        <Fragment>
          <List className='flex flex-col gap-3'>{fileList}</List>
          <div className='flex gap-3 justify-end'>
            <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
              Remove All
            </Button>
            <Button variant='contained'>Upload Files</Button>
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  )
}

export default FileUploaderMulti
