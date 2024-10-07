import React from 'react'

import Image from 'next/image'

import { Card, CardContent, Grid, Typography } from '@mui/material'

import LabIcon from '@/assets/logo-labararoty.jpg'

export default function ProtocolHead() {
  return (
    <Card className='w-full'>
      <CardContent>
        <Grid container>
          <Grid
            item
            xs={12}
            md={2}
            className='border  flex justify-center items-center max-sm:border-b-0 max-md:border-b-0'
          >
            <Image
              src={LabIcon}
              className='md:w-[120px] lg:w-[150px] 2xl:w-[200px]  h-[60px]' // just an example
              alt='akkreditation'
            />
          </Grid>

          <Grid item xs={12} md={10}>
            <Grid container>
              <Grid
                item
                xs={12}
                className='border-t border-b border-r max-md:border-l pl-1   text-textPrimary text-wrap '
              >
                <Typography className=' max-md:text-sm text-lg font-medium text-center '>
                  TEST-SINOV SERVICE MCHJ{' '}
                </Typography>
              </Grid>
              <Grid item xs={12} className=' border-b border-r pl-1 max-md:border-l    text-textPrimary text-wrap '>
                <Typography className='max-md:text-sm text-lg  text-textPrimary text-wrap font-medium text-center '>
                  Elektrotexnika mahsulotlarini sinash labaratoriyasi
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={2} className=' border-b border-r pl-1 max-md:border-l  text-textPrimary text-wrap '>
                    <Typography className='max-md:text-sm text-lg  text-textPrimary text-wrap font-medium text-center '>
                      SMK-17
                    </Typography>
                  </Grid>
                  <Grid item xs={8} className=' border-b border-r pl-1 max-md:border-l  text-textPrimary text-wrap '>
                    <Typography className='max-md:text-sm text-lg  text-textPrimary text-wrap font-medium text-center '>
                      Akkreditatsiya tog`risidagi guvohnoma OʻZAK.Y-02.SL-F01
                    </Typography>
                  </Grid>
                  <Grid item xs={2} className=' border-b border-r pl-1 max-md:border-l  text-textPrimary text-wrap '>
                    <Typography className='max-md:text-sm text-lg  text-textPrimary text-wrap font-medium text-center '>
                      5 dad 1-bet
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className=' border-b border-r pl-1 max-md:border-l  text-textPrimary text-wrap '>
                <Typography className='max-md:text-sm text-lg  text-textPrimary text-wrap font-medium text-center '>
                  Toshkent shahar Olmazor tumani{' '}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={4} className=' border-b border-r pl-1 max-md:border-l  text-textPrimary text-wrap '>
                    <Typography className='max-md:text-sm text-lg  text-textPrimary text-wrap font-medium text-center '>
                      Sinov bayonnomasi raqami
                    </Typography>
                  </Grid>
                  <Grid item xs={2} className=' border-b border-r pl-1 max-md:border-l  text-textPrimary text-wrap '>
                    <Typography className='max-md:text-sm text-lg  text-textPrimary text-wrap font-medium text-center '>
                      Y-02.SL-F01
                    </Typography>
                  </Grid>
                  <Grid item xs={4} className=' border-b border-r pl-1 max-md:border-l  text-textPrimary text-wrap '>
                    <Typography className='max-md:text-sm text-lg  text-textPrimary text-wrap font-medium text-center '>
                      Sinov bayonnomasi sanasi
                    </Typography>
                  </Grid>
                  <Grid item xs={2} className=' border-b border-r pl-1 max-md:border-l  text-textPrimary text-wrap '>
                    <Typography className='max-md:text-sm text-lg  text-textPrimary text-wrap font-medium text-center '>
                      02-05-2024
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className='mt-4'>
          <Grid item xs={12} md={9} className='text-center'></Grid>
          <Grid item xs={12} md={3}>
            <Typography className='text-textPrimary   text-wrap text-right font-semibold'>ТАСДИҚЛАЙМАН</Typography>
            <Typography className='  text-textPrimary text-wrap text-right font-semibold'>
              “TEX-SINOV SERVICE” MCHJ ELEKTROTEXNIKA MAXSULOTLARNI SINASH LABORATIRIYSI BOSHLIG’I
            </Typography>
            <Typography className='  text-textPrimary text-wrap text-right font-semibold'>
              {' '}
              _____________ Z. Alimov
            </Typography>
            <Typography className='  text-textPrimary text-wrap text-right font-semibold'>«01» yanvar 2024y</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
