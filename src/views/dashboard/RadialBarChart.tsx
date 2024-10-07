'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'

// Third-party Imports
import type { ApexOptions } from 'apexcharts'

import { CardHeader } from '@mui/material'

import type { DashboardBarChartData } from '@/data/mockData'
import OptionMenu from '@/@core/components/option-menu'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const BarChartRevenue = (props: DashboardBarChartData) => {
  // Hook
  const series = props.children.map(item => item.count)
  const successColor = `var(--mui-palette-${props.color}-main)`

  const colors = props.children.map(item => {
    if (props.color != 'blue') return `rgba(var(--mui-palette-${props.color}-mainChannel) / ${0.15 * item.id})`
    else return `rgba(var(--mui-palette-${props.color}-mainChannel) / ${0.15 * item.id})`
  })

  const labels = props.children.map(item => item.name)

  const options: ApexOptions = {
    labels: labels,

    colors: [successColor, ...colors],
    stroke: { width: 0 },
    dataLabels: {
      enabled: false,

      formatter(val: string) {
        return `${Number.parseInt(val)}`
      }
    },
    legend: {
      show: true,
      position: 'bottom',
      offsetY: 5,
      markers: {
        width: 10,
        height: 10,
        offsetY: 1,
        offsetX: 1
      },
      itemMargin: {
        horizontal: 15,
        vertical: 5
      },
      fontSize: '14.5rem',
      fontWeight: 500,
      labels: {
        colors: 'var()',
        useSeriesColors: false
      }
    },
    grid: {
      padding: {
        top: 1
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
          labels: {
            show: true,
            value: {
              fontSize: '1.2rem',
              color: `var(--mui-palette-${props.color}-main)`,
              fontWeight: 500,
              offsetY: -20
            },
            name: { offsetY: 20, color: `var(--mui-palette-${props.color}-main)` },
            total: {
              show: true,
              fontSize: '0.9375rem',
              fontWeight: 400,
              label: 'Jami',
              color: `var(--mui-palette-${props.color}-main)`
            }
          }
        }
      }
    }
  }

  return (
    <Card className='overflow-visible pb-6'>
      <CardHeader title={props.name} action={<OptionMenu options={['Select All', 'Refresh', 'Share']} />} />

      <AppReactApexCharts type='donut' height={452} width='100%' series={series} options={options} />
    </Card>
  )
}

export default BarChartRevenue
