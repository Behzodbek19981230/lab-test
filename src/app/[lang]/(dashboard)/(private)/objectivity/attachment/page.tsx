import React from 'react'

import { Card, CardContent } from '@mui/material'

import FileUploaderMulti from '@/components/FileUploaderMulti'

export default function Attachment() {
  return (
    <Card>
      <CardContent className='p-8'>
        <FileUploaderMulti title='Xolislik majburiyatlari' />
      </CardContent>
    </Card>
  )
}
