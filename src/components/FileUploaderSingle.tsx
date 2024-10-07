'use client'

import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Icon Imports

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { IconButton, List, ListItem } from '@mui/material'
import { toast } from 'react-toastify'

interface FileProp {
  name: string
  type: string
  size: number
}

const FileUploaderSingle = () => {
  // ** State
  const [files, setFiles] = useState<File[]>([])

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 2,
    maxSize: 2000000,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
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

  return (
    <Fragment>
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
            Logotip yuklash
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Allowed *.jpeg, *.jpg, *.png, *.gif</Typography>
          <Typography sx={{ color: 'text.secondary' }}>Max 2 files and max size of 2 MB</Typography>
        </Box>
      </div>
      {files.length ? (
        <Fragment>
          <List>{fileList}</List>
        </Fragment>
      ) : null}
    </Fragment>
  )
}

export default FileUploaderSingle
