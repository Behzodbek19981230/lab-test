'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'

import CardContent from '@mui/material/CardContent'
import MuiStep from '@mui/material/Step'
import type { StepProps } from '@mui/material/Step'
import type { CardContentProps } from '@mui/material/CardContent'

// Third Party Imports
import { toast } from 'react-toastify'
import classnames from 'classnames'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'
import DirectionalIcon from '@components/DirectionalIcon'

// Styled Component Imports
import StepperWrapper from '@core/styles/stepper'
import Step1 from '@/views/applications/create/Step1'
import Step2 from '@/views/applications/create/Step2'
import Step3 from '@/views/applications/create/Step3'
import Step4 from '@/views/applications/create/Step4'

const steps = [
  {
    icon: 'tabler-checkbox',
    title: 'Заявка на (пожалуйста отметьте галочкой  соответственный пункт)',
    subtitle: ''
  },
  {
    icon: 'tabler-user',
    title: 'Информация о заявителе',
    subtitle: ''
  },
  {
    icon: 'tabler-info-circle',
    title: 'Информация о лаборатории',
    subtitle: ''
  },
  {
    icon: 'tabler-clipboard-plus',
    title: 'Дополнительная информация',
    subtitle: ''
  }
]

const StepperHeaderContainer = styled(CardContent)<CardContentProps>(({ theme }) => ({
  borderRight: `1px solid 'var(--mui-palette-divider)'`,
  [theme.breakpoints.down('md')]: {
    borderRight: 0,
    borderBottom: `1px solid 'var(--mui-palette-divider)'`
  }
}))

const Step = styled(MuiStep)<StepProps>(({ theme }) => ({
  '& .MuiStepLabel-root': {
    paddingTop: 0
  },
  '&:first-of-type .MuiStepLabel-root': {
    paddingTop: theme.spacing(1)
  },
  '&:not(:last-of-type) .MuiStepLabel-root': {
    paddingBottom: theme.spacing(6)
  },
  '&:last-of-type .MuiStepLabel-root': {
    paddingBottom: theme.spacing(1)
  },
  '& .MuiStepLabel-iconContainer': {
    display: 'none'
  },
  '&.Mui-completed . flex-wrap , &.Mui-completed .step-subtitle': {
    color: 'var(--mui-palette-text-disabled)'
  }
}))

const ApplicationCreateForm = () => {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [state, setState] = useState<any>({})

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)

    if (activeStep === steps.length - 1) {
      toast.success('Form Submitted')
    }
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <Step1 state={state} setState={setState} />
      case 1:
        return <Step2 />
      case 2:
        return <Step3 state={state} setState={setState} />
      case 3:
        return <Step4 state={state} setState={setState} />
      default:
        return 'Unknown Step'
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}></Box>
        </>
      )
    } else {
      return (
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {steps[activeStep].title}
              </Typography>
              <Typography variant='caption' component='p'>
                {steps[activeStep].subtitle}
              </Typography>
            </Grid>
            {getStepContent(activeStep)}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant='tonal'
                color='secondary'
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<DirectionalIcon ltrIconClass='tabler-arrow-left' rtlIconClass='tabler-arrow-right' />}
              >
                Back
              </Button>
              <Button
                variant='contained'
                onClick={handleNext}
                endIcon={
                  activeStep === steps.length - 1 ? (
                    <i className='tabler-check' />
                  ) : (
                    <DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left' />
                  )
                }
              >
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </Grid>
          </Grid>
        </form>
      )
    }
  }

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant='h4' sx={{ mb: 3 }}>
            ЗАЯВКА
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            на аккредитацию испытательной лаборатории на соответствие требованиям O‘z DSt ISO/IEC 17025:2019
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, mt: 3 }}>
        <StepperHeaderContainer>
          <StepperWrapper sx={{ height: '100%' }}>
            <Stepper
              activeStep={activeStep}
              orientation='vertical'
              connector={<></>}
              sx={{ height: '100%', minWidth: '15rem', maxWidth: '15rem' }}
            >
              {steps.map((step, index) => {
                return (
                  <Step key={index}>
                    <StepLabel>
                      <div
                        className={
                          activeStep === index
                            ? 'border p-1 rounded-lg border-primary flex items-center gap-2'
                            : ' flex items-center gap-2'
                        }
                      >
                        <CustomAvatar
                          variant='rounded'
                          skin={activeStep === index ? 'filled' : 'light'}
                          {...(activeStep >= index && { color: 'primary' })}
                          {...(activeStep === index && { className: 'shadow-primarySm' })}
                          size={38}
                        >
                          <i className={classnames(step.icon)} />
                        </CustomAvatar>
                        <div>
                          <Typography className='step-title flex-wrap'>{step.title}</Typography>
                          <Typography className='step-subtitle'>{step.subtitle}</Typography>
                        </div>
                      </div>
                    </StepLabel>
                  </Step>
                )
              })}
            </Stepper>
          </StepperWrapper>
        </StepperHeaderContainer>
        <Divider sx={{ m: '0 !important' }} />
        <CardContent sx={{ width: '100%' }}>{renderContent()}</CardContent>
      </Card>
    </>
  )
}

export default ApplicationCreateForm
