import React, { Fragment } from 'react'

import { FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material'

export default function Step1({ state, setState }: any) {
  return (
    <Fragment key={0}>
      <Grid item xs={12} sm={6}>
        <RadioGroup
          name='radio-buttons-group'
          value={state.state11}
          onChange={e => setState({ ...state, state11: e.target.value })}
        >
          <FormControlLabel value='home' control={<Radio />} label='Аккредитация' />
          <FormControlLabel value='office' control={<Radio />} label='Пере-аккредитация' />
          <FormControlLabel value='home1' control={<Radio />} label='Расширение области аккредитации' />
          <FormControlLabel value='office1' control={<Radio />} label='Актуализация области аккредитации' />
          <FormControlLabel value='home2' control={<Radio />} label='Сокращение области аккредитации' />
          <FormControlLabel
            value='office2'
            control={<Radio />}
            label='Переход на новую версию нормативного документа, регламентирующего требования к оценке компетентности заявителя/объекта аккредитации.'
          />
        </RadioGroup>
      </Grid>
    </Fragment>
  )
}
