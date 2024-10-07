import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import type { InvoiceType } from '@/types/apps/invoiceTypes'

import './print.css'
import ApplicationTabDeatil from '@/views/applications/preview/application-tab'

const PreviewCard = ({ id, show }: { invoiceData?: InvoiceType; id: string; show: boolean }) => {
  return (
    <Card className='previewCard'>
      <CardContent className='sm:!p-12 gap-4 flex flex-col'>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <div className='p-6 bg-actionHover rounded'>
              <div className='flex justify-between gap-y-4 flex-col sm:flex-row'>
                <div className='flex flex-col gap-6'>
                  {show ? (
                    <h2 className='flex items-center gap-2.5'>Arizani ko`rish</h2>
                  ) : (
                    <h2 className='flex items-center gap-2.5'>Arizani tahlil qilish</h2>
                  )}
                </div>
                <div className='flex flex-col gap-6'>
                  <Typography variant='h5'>{`Ariza №${id}`}</Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <div className='flex flex-col gap-4'>
                  <div className='flex items-center justify-between p-3 bg-actionHover rounded'>
                    <Typography className='min-is-[100px] text-sm/[16px] font-bold'>Ro`yxatga olish sanasi:</Typography>
                    <Typography>11.02.2024</Typography>
                  </div>
                  <div className='flex items-center justify-between p-3 bg-actionHover rounded'>
                    <Typography className='min-is-[100px] text-sm/[16px] font-bold'>Ariza yuboruvchi:</Typography>
                    <Typography>Uz Test DTM</Typography>
                  </div>
                  <div className='flex items-center justify-between p-3 bg-actionHover rounded'>
                    <Typography className='min-is-[100px] text-sm/[16px] font-bold'>Ariza yuboruvchi STIR:</Typography>
                    <Typography>123456789</Typography>
                  </div>
                  <div className='flex items-center justify-between p-3 bg-actionHover rounded'>
                    <Typography className='min-is-[100px] text-sm/[16px] font-bold'>Ariza(qaror) raqami:</Typography>
                    <Typography>10/265-SI-2541-01.04.2024</Typography>
                  </div>
                  <div className='flex items-center justify-between p-3 bg-actionHover rounded'>
                    <Typography className='min-is-[100px] text-sm/[16px] font-bold'>Ariza sanasi:</Typography>
                    <Typography>05.08.2024</Typography>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className='flex flex-col gap-4'>
                  <div className='flex items-center justify-between p-3 bg-actionHover rounded'>
                    <Typography className='min-is-[100px] text-sm/[16px] font-bold'>Buyurtmachi:</Typography>
                    <Typography>Uz Auto AJ</Typography>
                  </div>
                  <div className='flex items-center justify-between p-3 bg-actionHover rounded'>
                    <Typography className='min-is-[100px] text-sm/[16px] font-bold'>Buyurtmachi STIR:</Typography>
                    <Typography>123456789</Typography>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <ApplicationTabDeatil />
      </CardContent>
    </Card>
  )
}

export default PreviewCard
