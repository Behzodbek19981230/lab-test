import React, { Fragment } from 'react'

import { FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@mui/material'

import CustomTextField from '@/@core/components/mui/TextField'

export default function Step3({ state, setState }: any) {
  return (
    <Fragment key={2}>
      <Grid item xs={12} sm={6}>
        <FormLabel>Имеются ли филиалы лаборатории? </FormLabel>
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
      <Grid item xs={12} sm={6}>
        <CustomTextField
          fullWidth
          label='Адрес/местоположение  '
          placeholder='Адрес/местоположение  '

          // onChange={e => setFirstName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormLabel>
          Занимается ли юридическое лицо иной коммерческой деятельностью, кроме оказания услуг по проведению испытаний?{' '}
        </FormLabel>
        <RadioGroup
          row
          name='radio-buttons-group'
          value={state.state32}
          onChange={e => setState({ ...state, state32: e.target.value })}
        >
          <FormControlLabel value='home' control={<Radio />} label='да' />
          <FormControlLabel value='office' control={<Radio />} label='нет' />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextField
          fullWidth
          label='Номер телефона'
          placeholder='Номер телефона'

          // onChange={e => setFirstName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormLabel>Имеется ли у Вас мобильный испытательный комплекс?</FormLabel>
        <RadioGroup
          row
          name='radio-buttons-group'
          value={state.state33}
          onChange={e => setState({ ...state, state33: e.target.value })}
        >
          <FormControlLabel value='home' control={<Radio />} label='да' />
          <FormControlLabel value='office' control={<Radio />} label='нет' />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextField
          fullWidth
          label='Ф.И.О. руководителя лаборатории филиала'
          placeholder='Ф.И.О. руководителя лаборатории филиала'

          // onChange={e => setFirstName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormLabel>Имеется ли у Вас удаленный персонал?</FormLabel>
        <RadioGroup
          row
          name='radio-buttons-group'
          value={state.state34}
          onChange={e => setState({ ...state, state34: e.target.value })}
        >
          <FormControlLabel value='home' control={<Radio />} label='да' />
          <FormControlLabel value='office' control={<Radio />} label='нет' />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextField
          fullWidth
          label='Номер телефона'
          placeholder='Номер телефона'

          // onChange={e => setFirstName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormLabel>Имеются ли у Вас другие офисы / представительства?</FormLabel>
        <RadioGroup
          row
          name='radio-buttons-group'
          value={state.state35}
          onChange={e => setState({ ...state, state35: e.target.value })}
        >
          <FormControlLabel value='home' control={<Radio />} label='да' />
          <FormControlLabel value='office' control={<Radio />} label='нет' />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextField
          fullWidth
          label='Если да, пожалуйста, укажите вид коммерческой деятельности'
          placeholder='Если да, пожалуйста, укажите вид коммерческой деятельности'

          // onChange={e => setFirstName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormLabel>Как давно в лаборатории внедрена система менеджмента?</FormLabel>
        <RadioGroup
          row
          name='radio-buttons-group'
          value={state.state36}
          onChange={e => setState({ ...state, state36: e.target.value })}
        >
          <FormControlLabel value='home' control={<Radio />} label='0 - 3 месяцев' />
          <FormControlLabel value='office' control={<Radio />} label='3-6 месяцев' />
          <FormControlLabel value='office1' control={<Radio />} label='больше 6 месяцев' />
        </RadioGroup>
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomTextField
          fullWidth
          label='Если да, то пожалуйста укажите Ф.И.О. '
          placeholder='Если да, то пожалуйста укажите Ф.И.О. '

          // onChange={e => setFirstName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormLabel>Был ли проведен внутренний аудит?</FormLabel>
        <RadioGroup
          row
          name='radio-buttons-group'
          value={state.state38}
          onChange={e => setState({ ...state, state38: e.target.value })}
        >
          <FormControlLabel value='home' control={<Radio />} label='да' />
          <FormControlLabel value='office' control={<Radio />} label='нет' />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextField
          fullWidth
          label='Если да, укажите имя провайдера проверки квалификации'
          placeholder='Если да, укажите имя провайдера проверки квалификации'

          // onChange={e => setFirstName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormLabel>Был ли проведен анализ со стороны руководства? </FormLabel>
        <RadioGroup
          row
          name='radio-buttons-group'
          value={state.state38}
          onChange={e => setState({ ...state, state38: e.target.value })}
        >
          <FormControlLabel value='home' control={<Radio />} label='да' />
          <FormControlLabel value='office' control={<Radio />} label='нет' />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormLabel>
          Принимала ли лаборатория участие в Проверке Квалификации/Межлабораторных сличительных испытаниях?{' '}
        </FormLabel>
        <RadioGroup
          row
          name='radio-buttons-group'
          value={state.state38}
          onChange={e => setState({ ...state, state38: e.target.value })}
        >
          <FormControlLabel value='home' control={<Radio />} label='да' />
          <FormControlLabel value='office' control={<Radio />} label='нет' />
        </RadioGroup>
      </Grid>
    </Fragment>
  )
}
