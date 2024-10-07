import React from 'react'

import Image from 'next/image'

import { Typography } from '@mui/material'

import AkkIcon from '@/assets/svg/logo.svg'

export default function AkkreditationLogo({ number }: { number: string }) {
  return (
    <div>
      <div className='border-2 border-[#003366] rounded-lg py-2 bg-white lg:w-[170px] 2xl:w-[220px] '>
        <div className='flex justify-center items-center'>
          <Image
            src={AkkIcon}
            className='md:w-[120px] lg:w-[150px] 2xl:w-[200px]  h-[60px]' // just an example
            alt='akkreditation'
          />
        </div>
        <div className='mt-2 bg-[#003366]'>
          <Typography className='pb-2 pt-1 text-center text-md  font-semibold text-white'>
            O`z DSt ISO/IEC 17025:2019
          </Typography>
        </div>
        <div className='text-xl mt-1 text-center font-bold text-[#FF0000]'>{number}</div>
      </div>
    </div>
  )
}
