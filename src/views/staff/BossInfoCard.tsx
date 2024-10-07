import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

const BossInfoCard = () => {
  return (
    <Card className='previewCard'>
      <CardContent className='sm:!p-4 gap-4 flex flex-col'>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <div className='p-4 bg-primary rounded'>
              <Typography className='text-lg text-center text-[var(--mui-palette-primary-contrastText)]'>
                “Namangan viloyati qurilish va uy-joy kommunal xo‘jaligi sohasida hududiy nazorat qilish
                inspeksiyasining sinov laboratoriyasi”
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <div className='flex flex-col gap-4'>
                  <div className='flex items-center justify-between p-3 bg-actionHover rounded'>
                    <Typography className='min-is-[100px] text-sm/[16px] font-bold'>Manzil:</Typography>
                    <Typography>160100, Namangan viloyati, Namangan shahri, A. Navoiy ko‘chasi, 22.</Typography>
                  </div>
                  <div className='flex items-center justify-between p-3 bg-actionHover rounded'>
                    <Typography className='min-is-[100px] text-sm/[16px] font-bold'>Reestr raqami:</Typography>
                    <Typography>№O`ZAK.SL.0352</Typography>
                  </div>
                  <div className='flex items-center justify-between p-3 bg-actionHover rounded'>
                    <Typography className='min-is-[100px] text-sm/[16px] font-bold'>Reestr sanasi:</Typography>
                    <Typography>06.05.2024y</Typography>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className='flex flex-col gap-4'>
                  <div className='flex items-center justify-between p-3 bg-actionHover rounded'>
                    <Typography className='min-is-[100px] text-sm/[16px] font-bold'>Rahbar:</Typography>
                    <Typography>Abdullayev Abdurashid Abdurashidovich</Typography>
                  </div>
                  <div className='flex items-center justify-between p-3 bg-actionHover rounded'>
                    <Typography className='min-is-[100px] text-sm/[16px] font-bold'>STIR: </Typography>
                    <Typography>201844011</Typography>
                  </div>
                  <div className='flex items-center justify-between p-3 bg-actionHover rounded'>
                    <Typography className='min-is-[100px] text-sm/[16px] font-bold'>Tel:</Typography>
                    <Typography>(+998 97) 297-33-00 </Typography>
                  </div>
                  <div className='flex items-center justify-between p-3 bg-actionHover rounded'>
                    <Typography className='min-is-[100px] text-sm/[16px] font-bold'>E-mail:</Typography>
                    <Typography>namangan.gasn@davarx.uz</Typography>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default BossInfoCard
