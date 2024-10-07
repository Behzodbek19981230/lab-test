// Next Imports
import { headers } from 'next/headers'

// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Type Imports
import type { ChildrenType } from '@core/types'
import type { Locale } from '@configs/i18n'

// Component Imports

// HOC Imports
import TranslationWrapper from '@/hocs/TranslationWrapper'

// Config Imports
import { i18n } from '@configs/i18n'

// Style Imports
import '@/app/globals.css'
import '@xyflow/react/dist/style.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'
import ProgressProvider from '@/providers/ProgressProvider'

export const metadata = {
  title: 'E-labaratoriya',
  description:
    'E-labaratoriya - is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.'
}

const RootLayout = ({ children, params }: ChildrenType & { params: { lang: Locale } }) => {
  // Vars
  const headersList = headers()
  const direction = i18n.langDirection[params.lang]

  return (
    <TranslationWrapper headersList={headersList} lang={params.lang}>
      <html id='__next' lang={params.lang} dir={direction}>
        <body className='flex is-full min-bs-full flex-auto flex-col'>
          <ProgressProvider>{children} </ProgressProvider>
        </body>
      </html>
    </TranslationWrapper>
  )
}

export default RootLayout
