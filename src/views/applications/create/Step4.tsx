import React, { Fragment } from 'react'

import { FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@mui/material'

import CustomTextField from '@/@core/components/mui/TextField'
import FileUploaderSingle from '@/components/FileUploaderSingle'

export default function Step4({ state, setState }: any) {
  return (
    <Fragment key={2}>
      <Grid item xs={12} sm={12}>
        <FormLabel>Использовала ли лаборатория консалтинговые услуги для подготовки к аккредитации?</FormLabel>
        <RadioGroup
          row
          name='radio-buttons-group'
          value={state.state31}
          onChange={e => setState({ ...state, state31: e.target.value })}
        >
          <FormControlLabel value='home' control={<Radio />} label='да' />
          <FormControlLabel value='office' control={<Radio />} label='нет' />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12}>
        <CustomTextField
          fullWidth
          label='Если да, пожалуйста, укажите название консалтинговой компании или консультанта.'
          placeholder='Если да, пожалуйста, укажите название консалтинговой компании или консультанта.'

          // onChange={e => setFirstName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <FileUploaderSingle />
      </Grid>
    </Fragment>
  )
}
