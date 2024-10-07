import React from 'react'

import Image from 'next/image'

import { Card, CardContent, Grid, Typography } from '@mui/material'

import LabIcon from '@/assets/logo-labararoty.jpg'
import PersonalsTable from '@/views/pasport/personals/PersonalsTable'

export default function PersonalsDetail() {
  return (
    <Card>
      <CardContent>
        <Grid container className='mb-3'>
          <Grid item xs={12} className='border-t border-l border-r p-2 '>
            <Typography variant='h6' className='text-center font-semibold'>
              “Namangan viloyati qurilish va uy-joy kommunal xo‘jaligi sohasida hududiy nazorat qilish inspeksiyasining
              sinov laboratoriyasi”{' '}
            </Typography>
          </Grid>
          <Grid item md={2} className='border  flex justify-center items-center'>
            <Image
              src={LabIcon}
              className='md:w-[120px] lg:w-[150px] 2xl:w-[200px]  h-[60px]' // just an example
              alt='akkreditation'
            />
          </Grid>
          <Grid
            item
            md={6}
            className='flex items-center justify-center border-t border-b border-r p-2 max-md:border-l max-md:columns-md-12 '
          >
            <h3 className='text-lg font-bold '>Personal haqida ma’lumot</h3>
          </Grid>

          <Grid item md={4}>
            <Grid container>
              <Grid item xs={12} className='border-t border-b border-r max-md:border-l pl-1  text-wrap '>
                <h3 className='text-lg font-medium text-black'>OʻZAK.Y-02.SL-F01</h3>
              </Grid>
              <Grid item xs={12} className=' border-b border-r pl-1 max-md:border-l   text-wrap '>
                <h3 className='text-lg font-medium text-black'>Umumiy ___ betning ___-beti</h3>
              </Grid>
              <Grid item xs={12} className=' border-b border-r pl-1 max-md:border-l text-wrap '>
                <h3 className='text-lg font-medium text-black'>Tahrir: 01</h3>
              </Grid>
              <Grid item xs={12} className=' border-b border-r pl-1 max-md:border-l text-wrap '>
                <h3 className='text-lg font-medium text-black'>Tahrir sanasi: 15.02.2023</h3>
              </Grid>
              <Grid item xs={12} className=' border-b border-r pl-1  max-md:border-l text-wrap '>
                <h3 className='text-lg font-medium text-black'>Amalga kiritish sanasi: 15.05.2023</h3>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <PersonalsTable />
      </CardContent>
    </Card>
  )
}
