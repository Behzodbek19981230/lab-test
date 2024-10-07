'use client'

import React from 'react'

import { DocumentEditor } from '@onlyoffice/document-editor-react'

export default function Onlyoffice() {
  return (
    <div className='h-[750px] rounded-md overflow-hidden'>
      <DocumentEditor
        id='docxEditor'
        documentServerUrl='https://o.tris.uz'
        config={{
          document: {
            fileType: 'doc',
            key: 'mkouhtgdfttgg',
            title: 'Test docx',
            url: 'https://cabinet-tris.ecdn.uz/api/file/get?id=1'
          },
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2N1bWVudCI6eyJmaWxlVHlwZSI6ImRvYyIsImtleSI6Im1rb3VodGdkZnR0Z2ciLCJ0aXRsZSI6IlRlc3QgZG9jeCIsInVybCI6Imh0dHBzOlwvXC9jYWJpbmV0LXRyaXMuZWNkbi51elwvYXBpXC9maWxlXC9nZXQ_aWQ9MSJ9LCJkb2N1bWVudFR5cGUiOiJ3b3JkIn0.iQmrR906TNiXhCviKUj1vwD6-l8GM4QbywmYC6dhhq0',
          documentType: 'word'
        }}
      />
    </div>
  )
}
