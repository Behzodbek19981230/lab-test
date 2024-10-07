import React, { Fragment } from 'react'

import { Grid } from '@mui/material'

import CustomTextField from '@/@core/components/mui/TextField'

export default function Step2() {
  return (
    <Fragment key={2}>
      <Grid item xs={12} sm={6}>
        <CustomTextField
          fullWidth
          label='Полное название юридического лица '
          placeholder='Полное название юридического лица '

          // onChange={e => setFirstName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextField
          fullWidth
          label='Полное название объекта аккредитации'
          placeholder='Полное название объекта аккредитации'

          // onChange={e => setFirstName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextField
          fullWidth
          label='Документальное подтверждение правового статуса организации (номер и дата регистрации)  '
          placeholder='Документальное подтверждение правового статуса организации (номер и дата регистрации)  '

          // onChange={e => setFirstName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextField
          fullWidth
          label='Юридический адрес (номер офиса/здания, улица, город, страна).  '
          placeholder='Юридический адрес (номер офиса/здания, улица, город, страна).  '

          // onChange={e => setFirstName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextField
          fullWidth
          label='Фактические адрес, если отличается от вышеуказанного (номер офиса/здания, улица, город, страна).  '
          placeholder='Фактические адрес, если отличается от вышеуказанного (номер офиса/здания, улица, город, страна).  '

          // onChange={e => setFirstName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextField
          fullWidth
          label='Номер телефона/факса'
          placeholder='Номер телефона/факса'

          // onChange={e => setFirstName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextField
          fullWidth
          label='Веб-сайт организации  '
          placeholder='Веб-сайт организации  '

          // onChange={e => setFirstName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextField
          fullWidth
          label='Электронный адрес '
          placeholder='Электронный адрес '

          // onChange={e => setFirstName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextField
          fullWidth
          label='Банковские реквизиты  '
          placeholder='Банковские реквизиты  '

          // onChange={e => setFirstName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextField
          fullWidth
          label='Идентификационный номер налогоплательщика (ИНН) '
          placeholder='Идентификационный номер налогоплательщика (ИНН) '

          // onChange={e => setFirstName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextField
          fullWidth
          label='Ф.И.О. руководителя юридического лица.  '
          placeholder='Ф.И.О. руководителя юридического лица.  '

          // onChange={e => setFirstName(e.target.value)}
        />
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
        <CustomTextField
          fullWidth
          label='Ф.И.О. руководителя лаборатории '
          placeholder='Ф.И.О. руководителя лаборатории '

          // onChange={e => setFirstName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextField
          fullWidth
          label='Номер телефона'
          placeholder='Номер телефона'

          // onChange={e => setFirstName(e.target.value)}
        />
      </Grid>
    </Fragment>
  )
}
