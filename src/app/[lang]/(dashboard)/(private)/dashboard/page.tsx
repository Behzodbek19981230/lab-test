import type { ReactNode } from 'react'

import Grid from '@mui/material/Grid'

import { Card, CardContent, CardHeader, Typography } from '@mui/material'

import { dashboardBarChartData } from '@/data/mockData'
import BarChartRevenue from '@/views/dashboard/RadialBarChart'
import EarningReports from '@/views/dashboard/EarningReports'
import EarningReports1 from '@/views/dashboard/EarningReports1'
import CustomAvatar from '@/@core/components/mui/Avatar'
import type { ThemeColor } from '@/@core/types'

type DataType = {
  title: string
  value: string
  color: ThemeColor
  icon: ReactNode
}

const data: DataType[] = [
  {
    title: 'Labaratoriya akkreditatsiya guvohnomasi raqami',
    value: '№ UZ.AS.001.001"',
    color: 'warning',
    icon: (
      <svg xmlns='http://www.w3.org/2000/svg' width='38' height='38' viewBox='0 0 38 38' fill='none'>
        <path
          opacity='0.2'
          d='M8.08984 29.9102C6.72422 28.5445 7.62969 25.6797 6.93203 24.0023C6.23438 22.325 3.5625 20.8555 3.5625 19C3.5625 17.1445 6.20469 15.7344 6.93203 13.9977C7.65938 12.2609 6.72422 9.45547 8.08984 8.08984C9.45547 6.72422 12.3203 7.62969 13.9977 6.93203C15.675 6.23438 17.1445 3.5625 19 3.5625C20.8555 3.5625 22.2656 6.20469 24.0023 6.93203C25.7391 7.65938 28.5445 6.72422 29.9102 8.08984C31.2758 9.45547 30.3703 12.3203 31.068 13.9977C31.7656 15.675 34.4375 17.1445 34.4375 19C34.4375 20.8555 31.7953 22.2656 31.068 24.0023C30.3406 25.7391 31.2758 28.5445 29.9102 29.9102C28.5445 31.2758 25.6797 30.3703 24.0023 31.068C22.325 31.7656 20.8555 34.4375 19 34.4375C17.1445 34.4375 15.7344 31.7953 13.9977 31.068C12.2609 30.3406 9.45547 31.2758 8.08984 29.9102Z'
          fill='currentColor'
        />
        <path
          d='M25.5312 15.4375L16.818 23.75L12.4687 19.5937M8.08984 29.9102C6.72422 28.5445 7.62969 25.6797 6.93203 24.0023C6.23437 22.325 3.5625 20.8555 3.5625 19C3.5625 17.1445 6.20469 15.7344 6.93203 13.9977C7.65937 12.2609 6.72422 9.45547 8.08984 8.08984C9.45547 6.72422 12.3203 7.62969 13.9977 6.93203C15.675 6.23437 17.1445 3.5625 19 3.5625C20.8555 3.5625 22.2656 6.20469 24.0023 6.93203C25.7391 7.65937 28.5445 6.72422 29.9102 8.08984C31.2758 9.45547 30.3703 12.3203 31.068 13.9977C31.7656 15.675 34.4375 17.1445 34.4375 19C34.4375 20.8555 31.7953 22.2656 31.068 24.0023C30.3406 25.7391 31.2758 28.5445 29.9102 29.9102C28.5445 31.2758 25.6797 30.3703 24.0023 31.068C22.325 31.7656 20.8555 34.4375 19 34.4375C17.1445 34.4375 15.7344 31.7953 13.9977 31.068C12.2609 30.3406 9.45547 31.2758 8.08984 29.9102Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    )
  },
  {
    title: 'Akkreditatsiya sanasi',
    value: '01.05.2025',
    color: 'primary',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='38'
        height='38'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='icon icon-tabler icons-tabler-outline icon-tabler-calendar'
      >
        <path stroke='none' d='M0 0h38v38H0z' fill='none' />
        <path d='M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z' />
        <path d='M16 3v4' />
        <path d='M8 3v4' />
        <path d='M4 11h16' />
        <path d='M11 15h1' />
        <path d='M12 15v3' />
      </svg>
    )
  },
  {
    title: 'Labaratoriya rahbari',
    value: 'F.I.O',
    color: 'info',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='38'
        height='38'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='icon icon-tabler icons-tabler-outline icon-tabler-user'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0' />
        <path d='M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2' />
      </svg>
    )
  }
]

const DashboardCRM = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={8} lg={12}>
        <Card>
          <CardHeader
            title={`“Railway Transport Engineering” mas‘uliyati cheklangan jamiyatining putur yetkazmasdan tekshirish laboratoriyasi`}
          />
          <CardContent className='flex flex-col gap-5'>
            <div className='flex flex-wrap max-md:flex-col justify-between gap-6'>
              {data.map((item, i) => (
                <div key={i} className='flex gap-4'>
                  <CustomAvatar variant='rounded' skin='light' size={54} color={item.color}>
                    {item.icon}
                  </CustomAvatar>
                  <div>
                    <Typography className='font-medium'>{item.title}</Typography>
                    <Typography variant='h5' color={`${item.color}.main`}>
                      {item.value}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Grid>
      {dashboardBarChartData.map(item => (
        <Grid item xs={12} md={8} lg={4} key={item.id}>
          <BarChartRevenue {...item} />
        </Grid>
      ))}

      <Grid item xs={12} md={8} lg={6}>
        <EarningReports1 />
      </Grid>
      <Grid item xs={12} md={8} lg={6}>
        <EarningReports />
      </Grid>
    </Grid>
  )
}

export default DashboardCRM
