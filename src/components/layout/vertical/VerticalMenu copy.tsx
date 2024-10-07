import { useParams } from 'next/navigation'

import { useTheme } from '@mui/material/styles'
import PerfectScrollbar from 'react-perfect-scrollbar'

import type { getDictionary } from '@/utils/getDictionary'
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'
import { Menu, MenuItem, SubMenu } from '@menu/vertical-menu'
import useVerticalNav from '@menu/hooks/useVerticalNav'
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'
import CustomChip from '@/@core/components/mui/Chip'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ dictionary, scrollMenu }: Props) => {
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const params = useParams()
  const { isBreakpointReached } = useVerticalNav()

  const { transitionDuration } = verticalNavOptions
  const { lang: locale } = params

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <MenuItem className='uppercase' href={`/${locale}/dashboard`} icon={<i className='tabler-home-stats' />}>
          {dictionary['dashboard']}
        </MenuItem>

        <SubMenu
          label={dictionary['applications']}
          icon={<i className='tabler-file-description' />}
          suffix={<CustomChip label={5800} size='small' color='error' round='true' />}
        >
          <MenuItem href={`/${locale}/applications`}>{dictionary['Incoming']}</MenuItem>
          <MenuItem href={`/${locale}/applications/accepted`}>{dictionary['accepted']}</MenuItem>
        </SubMenu>
        <SubMenu
          className='uppercase'
          label={dictionary['GeneralRequirements']}
          icon={<i className='tabler-clipboard-list' />}
        >
          <SubMenu className='normal-case' label={dictionary['Objectivity']}>
            <MenuItem href={`/${locale}/objectivity/attachment`}>{dictionary['Attachment']}</MenuItem>
            <MenuItem href={`/${locale}/objectivity/states`}>{dictionary['Satates']}</MenuItem>
            <MenuItem href={`/${locale}/objectivity/events`}>{dictionary['Events']}</MenuItem>
          </SubMenu>
          <MenuItem className='normal-case' href={`#`}>
            {dictionary['Security']}
          </MenuItem>
        </SubMenu>
        <MenuItem className='uppercase' href={`/${locale}/structure`} icon={<i className='tabler-sitemap' />}>
          {dictionary['OrganizationalStructureLaboratory']}
        </MenuItem>
        <SubMenu className='uppercase' label={dictionary['Resources']} icon={<i className='tabler-server-cog' />}>
          <SubMenu className='normal-case' label={dictionary['staff']}>
            <MenuItem href={`/${locale}/staff/tasks`}>{dictionary['tasks']}</MenuItem>
            <MenuItem href={`/${locale}/staff/upgrade`}>{dictionary['upgrade']}</MenuItem>
          </SubMenu>
          <MenuItem className='normal-case' href={`/${locale}/products/accepted`}>
            {dictionary['TestRooms']}
          </MenuItem>
          <MenuItem className='normal-case' href={`/${locale}/devices`}>
            {dictionary['Devices']}
          </MenuItem>
          <MenuItem className='normal-case' href={`#`}>
            {dictionary['RegulatoryDocuments']}
          </MenuItem>
          <MenuItem className='normal-case' href={`#`}>
            {dictionary['MetrologicalTraceability']}
          </MenuItem>
          <MenuItem className='normal-case' href={`#`}>
            {dictionary['ForeignService']}
          </MenuItem>
        </SubMenu>
        <SubMenu className='uppercase' label={dictionary['MainProcess']} icon={<i className='tabler-dashboard' />}>
          <MenuItem className='normal-case' href={`#`}>
            Talabnoma
          </MenuItem>
          <MenuItem className='normal-case' href={`#`}>
            Tendr
          </MenuItem>

          <MenuItem className='normal-case' href={`#`}>
            Usullarni tanlash
          </MenuItem>
          <MenuItem className='normal-case' href={`#`}>
            Muvofiqlikni baholash
          </MenuItem>

          <MenuItem className='normal-case' href={`#`}>
            Verifikasiya
          </MenuItem>
          <MenuItem className='normal-case' href={`#`}>
            Namuna olish
          </MenuItem>
          <SubMenu className='normal-case' label={dictionary['products']}>
            <MenuItem href={`/${locale}/products/accepted`}>{dictionary['accepted']}</MenuItem>
            <MenuItem href={`/${locale}/products/labaratory`}>{dictionary['labaratoryProductsStatus']}</MenuItem>
          </SubMenu>
          <MenuItem className='normal-case' href={`#`}>
            Texnik yozuvlar{' '}
          </MenuItem>
          <MenuItem className='normal-case' href={`#`}>
            Noaniqliklarni baholash
          </MenuItem>
          <MenuItem className='normal-case' href={`#`}>
            Haqqoniylikni ta’minlash
          </MenuItem>

          <SubMenu className='normal-case' label={dictionary['Complaints']}>
            <MenuItem href={`/${locale}/complaints/incoming`}>{dictionary['Incoming']}</MenuItem>
            <MenuItem href={`/${locale}/complaints/response`}>{dictionary['ResponseLetters']}</MenuItem>
          </SubMenu>
          <MenuItem className='normal-case' href={`#`}>
            Nomuvofiq ishlar
          </MenuItem>
          <MenuItem className='normal-case' href={`#`}>
            Axborot menejmenti
          </MenuItem>
        </SubMenu>
        <MenuItem className='normal-case' href={`/${locale}/agreements`} icon={<i className='tabler-abacus' />}>
          {dictionary['agreements']}
        </MenuItem>
        <MenuItem className='normal-case' href={`/${locale}/tariff`} icon={<i className='tabler-calculator' />}>
          Ta`rif
        </MenuItem>
        <SubMenu label={dictionary['monitoring']} icon={<i className='tabler-device-analytics' />}>
          <MenuItem href={`/${locale}/monitoring/environmental-conditions`}>
            {dictionary['EnvironmentalConditions']}
          </MenuItem>
          <MenuItem href={`/${locale}/monitoring/environmental-norma`}>Monitoring normasi</MenuItem>
        </SubMenu>
        <MenuItem href={`/${locale}/protocol/list`} icon={<i className='tabler-checkup-list' />}>
          {dictionary['protocols']}
        </MenuItem>
        <MenuItem href={`/${locale}/invalid-products`} icon={<i className='tabler-devices-x' />}>
          {dictionary['InvalidProducts']}
        </MenuItem>

        <SubMenu className='uppercase' label='Menejment tizimi' icon={<i className='tabler-cpu' />}>
          <MenuItem className='normal-case' href={`/${locale}/management/quality-documents`}>
            Sifat menedjmenti hujjatlari
          </MenuItem>
          <MenuItem className='normal-case' href={`/${locale}/management/documents`}>
            Hujjatlarni boshqarish
          </MenuItem>

          <MenuItem className='normal-case' href={`/${locale}/management/recording`}>
            Yozuvlarni boshqarish{' '}
          </MenuItem>
          <MenuItem className='normal-case' href={`/${locale}/management/dealing-risk`}>
            Xavf-xatar bilan ishlash
          </MenuItem>
          <MenuItem className='normal-case' href={`/${locale}/management/working-with-opportunities`}>
            Imkoniyatlar bilan ishlash
          </MenuItem>
          <MenuItem className='normal-case' href={`/${locale}/management/improvement`}>
            Yaxshilash{' '}
          </MenuItem>

          <MenuItem className='normal-case' href={`/${locale}/management/corrective-actions`}>
            Tuzatuvchi harakatlar{' '}
          </MenuItem>
          <SubMenu className='normal-case' label={dictionary['Audit']}>
            <MenuItem href={`/${locale}/audit/conducted-audits`}>{dictionary['ConductedAudits']}</MenuItem>
            <MenuItem href={`/${locale}/audit/periodic-audit`}>{dictionary['PeriodicAudit']}</MenuItem>
            <MenuItem href={`/${locale}/audit/internal-audit`}>{dictionary['InternalAudit']}</MenuItem>
            <MenuItem href={`/${locale}/audit/inspection-check`}>{dictionary['InspectionCheck']}</MenuItem>
          </SubMenu>
          <MenuItem className='normal-case' href={`/${locale}/management/analysis`}>
            Rahbariyat tahlili
          </MenuItem>
        </SubMenu>
        <SubMenu label='Murojaatlar' icon={<i className='tabler-message-2' />}>
          <MenuItem href={`/${locale}/appeals/incoming`}>Kirish xatlari</MenuItem>
          <MenuItem href={`/${locale}/appeals/outgoing`}>Chiqish xatlari</MenuItem>
        </SubMenu>
        <MenuItem href={`/${locale}/akkreditation`} icon={<i className='tabler-letter-a' />}>
          {dictionary['akkreditatsiya']}
        </MenuItem>
        <SubMenu label={dictionary['pasport']} icon={<i className='tabler-id' />}>
          <MenuItem href={`/${locale}/pasport/resurces`}>{dictionary['resurces']}</MenuItem>
          <MenuItem href={`/${locale}/pasport/personal`}>{dictionary['aboutPersonal']}</MenuItem>
          <MenuItem href={`/${locale}/pasport/rooms`}>{dictionary['aboutRooms']}</MenuItem>
          <MenuItem href={`/${locale}/pasport/equipments`}>{dictionary['aboutEquipment']}</MenuItem>
        </SubMenu>
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
