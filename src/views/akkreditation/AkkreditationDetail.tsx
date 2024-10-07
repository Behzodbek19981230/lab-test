'use client'
import React from 'react'

import { Card, CardContent, Grid, Typography } from '@mui/material'

import AkkreditationLogo from '@/components/AkkreditationLogo'
import AkkreditationTable from '@/views/akkreditation/AkkreditationTable'

export default function AkkreditationDetail() {
  return (
    <>
      <Card>
        <div className='flex flex-col items-center p-4'>
          <Typography className='text-center w-100 text-black'>
            Akkreditatsiya to‘g‘risidagi guvohnoma ilovasi (Umumiy ___ betning ___-beti)
          </Typography>
          <Typography className='text-center w-100 text-lg text-black '>AKKREDITATSIYADAN O‘TKAZISH SOHASI</Typography>
        </div>
        <CardContent>
          <Grid container className='mb-3'>
            <Grid item md={2} className='border p-2 '>
              <AkkreditationLogo number='O`ZAK.SL.0358' />
            </Grid>
            <Grid item md={10}>
              <Grid container>
                <Grid item xs={12} md={12} className='border-t border-b border-r p-4 text-center text-wrap '>
                  <div className='xl:w-[650px] mx-auto'>
                    <h3 className='text-lg font-semibold'>
                      “GULISTON DAVLAT UNIVERSITETI” oliy va o‘rta ta’lim muassasi DAVLAT REYESTR RAQAMI: O‘ZAK.SL.0358
                    </h3>
                    <p className='text-sm'>
                      Akkreditatsiyadan o‘tkazish sohasining 2024-yil 8-iyuldagi 01-sonli tahriri.
                    </p>
                    <h3 className='text-lg font-semibold'>SINOV LABORATORIYASI </h3>
                    <p className='text-sm'>Akkreditatsiya standarti: O‘z DSt ISO/IEC 17025:2019</p>
                  </div>
                </Grid>
                <Grid item xs={12} md={8} className='border-b border-r p-2  text-left'>
                  <h5 className='text-sm font-semibold'> Yuridik manzil:</h5>
                  <p className='text-sm'> 120100, Sirdaryo viloyati, Guliston shahri, Talabalar ko‘chasi, 9.</p>
                  <h5 className='text-sm font-semibold'>Akkreditatsiya obyekti joylashgan manzili: </h5>
                  <p className='text-sm'>
                    120100, Sirdaryo viloyati, Guliston shahri, 4-kichik daha, GulDU asosiy binosi.
                  </p>
                </Grid>
                <Grid item xs={12} md={4} className='border-b border-r p-2 '>
                  <h5 className='text-sm font-semibold'> Telefon:</h5>
                  <p className='text-sm'> (+998 67) 225-24-90</p>
                  <h5 className='text-sm font-semibold'> E-pochta: </h5>
                  <p className='text-sm'>kushiev@mail.ru</p>
                  <h5 className='text-sm font-semibold'> Web-site: </h5>
                  <p className='text-sm'>www.guldu.uz</p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <AkkreditationTable />
        </CardContent>
      </Card>
    </>
  )
}
