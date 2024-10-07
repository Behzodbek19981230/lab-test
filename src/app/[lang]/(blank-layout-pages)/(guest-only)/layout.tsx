// Type Imports
import type { ChildrenType } from '@core/types'
import type { Locale } from '@/configs/i18n'

// HOC Imports

const Layout = ({ children, params }: ChildrenType & { params: { lang: Locale } }) => {
  return <div lang={params.lang}>{children}</div>
}

export default Layout
