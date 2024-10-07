// MUI Imports
import { redirect } from 'next/navigation'

import type { Locale } from '@/configs/i18n'
import { deviceTabData } from '@/data/tabs'

const DeviceList = async ({ params }: { params: { lang: Locale } }) => {
  redirect(`/${params.lang}/devices/${deviceTabData[0].value}`)
}

export default DeviceList
