'use client'

// MUI Imports

import { usePathname } from 'next/navigation'

import Grid from '@mui/material/Grid'

import type { InvoiceType } from '@/types/apps/invoiceTypes'

// Component Imports
import PreviewActions from './PreviewActions'
import PreviewCard from './PreviewCard'

// eslint-disable-next-line @next/next/no-async-client-component
const Preview = ({ invoiceData, id }: { invoiceData?: InvoiceType; id: string }) => {
  // Handle Print Button Click
  const params = usePathname()
  const show = params.includes('/show/')

  const handleButtonClick = () => {
    window.print()
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={9}>
        <PreviewCard invoiceData={invoiceData} id={id} show={show} />
      </Grid>
      <Grid item xs={12} md={3}>
        <PreviewActions onButtonClick={handleButtonClick} show={show} />
      </Grid>
    </Grid>
  )
}

export default Preview
