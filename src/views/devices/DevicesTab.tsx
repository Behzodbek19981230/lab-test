'use client'

// React Imports
import { useState } from 'react'
import type { SyntheticEvent } from 'react'

// MUI Imports
import { useParams, useRouter } from 'next/navigation'

import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import Grid from '@mui/material/Grid'

// Component Imports
import CustomTabList from '@core/components/mui/TabList'
import type { Locale } from '@/configs/i18n'
import DevicesListTable from '@/views/devices/DevicesList'

const DevicesTab = ({ tabs }: { tabs: { label: string; value: string }[] }) => {
  const params = useParams<{ tab: string; types: string; lang: Locale }>()
  const router = useRouter()

  // States
  const [activeTab, setActiveTab] = useState<string>(params.tab)

  const handleChange = (event: SyntheticEvent, value: string) => {
    router.push(`/${params.lang}/devices/${value}`)
    setActiveTab(value)
  }

  return (
    <>
      <TabContext value={activeTab}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <CustomTabList onChange={handleChange} variant='fullWidth' pill='true'>
              {tabs.map(tab => (
                <Tab key={tab.value} value={tab.value} label={tab.label} iconPosition='start' />
              ))}
            </CustomTabList>
          </Grid>
          <Grid item xs={12}>
            <TabPanel value={activeTab} className='p-0'>
              <DevicesListTable />
            </TabPanel>
          </Grid>
        </Grid>
      </TabContext>
    </>
  )
}

export default DevicesTab
