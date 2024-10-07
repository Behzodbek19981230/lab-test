'use client'

import { Grid } from '@mui/material'

export default function IncomingPdf() {
  return (
    <Grid container gap={4}>
      <Grid item xs={12}>
        <embed src='/алфа траст .pdf' type='application/pdf' width='100%' height='900px' />
      </Grid>
    </Grid>
  )
}
