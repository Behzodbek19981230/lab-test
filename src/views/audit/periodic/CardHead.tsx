import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { Button, CardHeader } from '@mui/material'

const CardHeadPeriodicAudit = () => {
  return (
    <Card className='previewCard'>
      <CardHeader title='Davriy audit' />
      <CardContent className='sm:!p-4 gap-4 flex flex-col'>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <div className='flex flex-col gap-4'>
                  <div className='flex items-center justify-between p-3 bg-actionHover rounded'>
                    <Typography className='min-is-[100px] text-sm/[16px] font-bold'>Sana:</Typography>
                    <Typography>20.05.2024 y</Typography>
                  </div>
                  <div className='flex items-center justify-between p-3 bg-actionHover rounded'>
                    <Typography className='min-is-[100px] text-sm/[16px] font-bold'>Audit qaror raqami:</Typography>
                    <Typography>№O`ZAK.SL.0352</Typography>
                  </div>
                  <div className='flex items-center justify-between p-3 bg-actionHover rounded'>
                    <Typography className='min-is-[100px] text-sm/[16px] font-bold'>Qaror sanasi:</Typography>
                    <Typography>06.05.2024y</Typography>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className='flex flex-col gap-4'>
                  <div className='flex items-center justify-between p-3 bg-actionHover rounded'>
                    <Typography className='min-is-[100px] text-sm/[16px] font-bold'>
                      Audit o`zkazuvchi tamon:{' '}
                    </Typography>
                    <Typography></Typography>
                  </div>
                  <div className='flex items-center justify-between p-3 bg-actionHover rounded'>
                    <Typography className='min-is-[100px] text-sm/[16px] font-bold'>Ijrochi:</Typography>
                    <Typography>Abdullayev Abdurashid Abdurashidovich</Typography>
                  </div>

                  <div className='flex items-center justify-between p-3 bg-actionHover rounded'>
                    <Typography className='min-is-[100px] text-sm/[16px] font-bold'>
                      Audit o`tkazish muddati:
                    </Typography>
                    <Typography>30.08.2024 y</Typography>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <div className='flex justify-between'>
          <Button variant='outlined' color='success'>
            Tasdiqlash
          </Button>
          <Button variant='outlined' color='warning'>
            Ma`qullash
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardHeadPeriodicAudit
