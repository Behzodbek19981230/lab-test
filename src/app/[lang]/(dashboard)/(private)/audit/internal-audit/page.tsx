import React from 'react'

import { Grid } from '@mui/material'

import Onlyoffice from '@/components/OnlyOffice/OnlyOffice'
import CardHeadPeriodicAudit from '@/views/audit/periodic/CardHead'

export default function PeriodicAudit() {
  return (
    <Grid container gap={4}>
      <Grid item xs={12}>
        <CardHeadPeriodicAudit />
      </Grid>
      <Grid item xs={12}>
        <Onlyoffice />
      </Grid>
    </Grid>
  )
}
