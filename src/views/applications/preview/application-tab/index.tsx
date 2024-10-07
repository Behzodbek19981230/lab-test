'use client'

// React Imports
import type { SyntheticEvent } from 'react'
import { useState } from 'react'

// MUI Imports
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import Grid from '@mui/material/Grid'

// Component Imports
import CustomTabList from '@core/components/mui/TabList'
import DocumentsListTable from '@/views/applications/preview/application-tab/Documents'
import Products from '@/views/applications/preview/application-tab/Products'
import TestProducts from '@/views/applications/preview/application-tab/TestProduct'

const ApplicationTabDeatil = () => {
  // States
  const [activeTab, setActiveTab] = useState('documents')

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  return (
    <>
      <TabContext value={activeTab}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
              <Tab
                icon={<i className='tabler-files' />}
                value='documents'
                label='Taqdim etilayotgan hujjatlar'
                iconPosition='start'
              />
              <Tab
                icon={<i className='tabler-file-certificate' />}
                value='products'
                label='Mahsulotni tahlil qilish'
                iconPosition='start'
              />

              <Tab
                icon={<i className='tabler-award' />}
                value='test'
                label='Mahsulotni sinovga qabul qilish'
                iconPosition='start'
              />
            </CustomTabList>
          </Grid>
          <Grid item xs={12}>
            <TabPanel value={activeTab} className='p-0'>
              {activeTab === 'documents' && <DocumentsListTable />}
              {activeTab === 'products' && <Products />}
              {activeTab === 'test' && <TestProducts />}
            </TabPanel>
          </Grid>
        </Grid>
      </TabContext>
    </>
  )
}

export default ApplicationTabDeatil
