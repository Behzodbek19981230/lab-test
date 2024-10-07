'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'

// Type Imports
import { Controller, useForm } from 'react-hook-form'

import { Grid } from '@mui/material'

import toast from 'react-hot-toast'

import type { Locale } from '@configs/i18n'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Styled Component Imports
import type { IUserRole } from '@/utils/interfaces'
import { data } from '@/data/users'
import AuthIllustrationWrapper from '@/views/AuthIllustrationWrapper'

type FormValues = {
  username: string
  password: string
}

const roleBasedRedirect: Record<IUserRole, string> = {
  admin: '/dashboard',
  'korxona rahbari': '/dashboard',
  akkreditatsiya: '/dashboard',
  auditor: '/dashboard',
  byuro: '/dashboard',
  menejer: '/dashboard',
  uzstandart: '/dashboard',
  'labaratoriya boshliq': '/dashboard',
  'labaratoriya mutahasis': '/dashboard'
}

const Login = () => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const router = useRouter()

  const {
    control,
    reset,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      password: '',
      username: ''
    }
  })

  // Hooks
  const { lang: locale } = useParams()

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const onSubmit = async (e: FormValues) => {
    const user = data.find(itm => itm.username == e.username && itm.password == e.password)

    if (!user) {
      toast.error('Invalid credentials')
      setError('username', { type: 'custom', message: 'custom message' })

      return
    }

    const response = await fetch('/api/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: e.username, password: e.password })
    })

    if (response.ok) {
      const responseData = await response.json() // Parse the JSON response

      console.log(responseData)

      // Get user role from the response data
      const userRole = responseData.session?.user?.role // Adjust this based on your actual response structure
      const redirectPath = roleBasedRedirect[userRole as keyof typeof roleBasedRedirect] || '/dashboards'

      // Redirect the user based on their role
      router.push(redirectPath)
    } else {
      // Handle errors
      console.error('Login failed')
    }

    reset()
  }

  return (
    <AuthIllustrationWrapper>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='sm:!p-12'>
          <Link href={getLocalizedUrl('/', locale as Locale)} className='flex justify-center mbe-6'>
            <Logo />
          </Link>
          <div className='flex flex-col gap-1 mbe-6'>
            <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}!`}</Typography>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={12}>
                <Controller
                  name='username'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label='Username'
                      placeholder='username'
                      {...(errors.username && { error: true, helperText: 'This field is required.' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label='Password'
                      placeholder='············'
                      id='form-validation-basic-password'
                      type={isPasswordShown ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={handleClickShowPassword}
                              onMouseDown={e => e.preventDefault()}
                              aria-label='toggle password visibility'
                            >
                              <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      {...(errors.password && { error: true, helperText: 'This field is required.' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
                  <FormControlLabel control={<Checkbox />} label='Remember me' />
                  <Typography
                    className='text-end'
                    color='primary'
                    component={Link}
                    href={getLocalizedUrl('/pages/auth/forgot-password-v1', locale as Locale)}
                  >
                    Forgot password?
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button fullWidth variant='contained' type='submit'>
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </AuthIllustrationWrapper>
  )
}

export default Login
