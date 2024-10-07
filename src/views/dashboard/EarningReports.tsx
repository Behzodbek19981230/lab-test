// Next Imports

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Third Party Imports
import classnames from 'classnames'

// Types Imports
import type { ThemeColor } from '@core/types'

// Components Imports
import OptionMenu from '@core/components/option-menu'

type DataType = {
  title: string
  subtitle: string
  amount: string
  trendNumber: number
  avatarIcon: string
  avatarColor: ThemeColor
  trend?: 'positive' | 'negative'
}

const data: DataType[] = [
  {
    amount: '1,619',
    trendNumber: 18.6,
    title: 'Kelib tushgan arizalar soni',
    avatarColor: 'primary',
    subtitle: '12.4k Sales',
    avatarIcon: 'tabler-chart-pie-2'
  },
  {
    amount: '3,571',
    trendNumber: 39.6,
    title: 'Ijroga qabul qilingan arizalar soni',
    avatarColor: 'success',
    subtitle: 'Sales, Affiliation',
    avatarIcon: 'tabler-currency-dollar'
  },
  {
    amount: '430',
    trendNumber: -22.8,
    trend: 'negative',

    title: 'Sinovga taqdim etilgan mahsulotlar soni',
    avatarColor: 'secondary',
    subtitle: 'ADVT, Marketing',
    avatarIcon: 'tabler-credit-card'
  },
  {
    amount: '430',
    trendNumber: 52.8,
    title: 'O`tkazilgan sinovlar soni',
    avatarColor: 'secondary',
    subtitle: 'ADVT, Marketing',
    avatarIcon: 'tabler-credit-card'
  },
  {
    amount: '430',
    trendNumber: -2.8,
    trend: 'negative',
    title: 'Yaroqsiz mahsulotlar soni',
    avatarColor: 'secondary',
    subtitle: 'ADVT, Marketing',
    avatarIcon: 'tabler-credit-card'
  }
]

const EarningReports = () => {
  return (
    <Card>
      <CardHeader
        title='O`tgan yili shu davrga nisbatan bajarilgan ishlar'
        action={<OptionMenu options={['Refresh', 'Update', 'Share']} />}
      />
      <CardContent className='flex flex-col gap-5'>
        {data.map((item, index) => (
          <div key={index} className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {item.title}
                </Typography>
                <Typography variant='body2'>{item.subtitle}</Typography>
              </div>
              <div className='flex items-center gap-4'>
                <Typography>{item.amount}</Typography>
                <div className='flex items-center gap-1'>
                  <i
                    className={classnames(
                      item.trend === 'negative' ? 'tabler-chevron-down text-error' : 'tabler-chevron-up text-success',
                      'text-xl'
                    )}
                  />
                  <Typography
                    variant='body2'
                    className={item.trend === 'negative' ? 'text-error' : 'text-success'}
                  >{`${item.trendNumber}%`}</Typography>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* <div className='pbs-[60px]'>
          <AppReactApexCharts type='bar' height={158} width='100%' series={series} options={options} />
        </div> */}
      </CardContent>
    </Card>
  )
}

export default EarningReports
