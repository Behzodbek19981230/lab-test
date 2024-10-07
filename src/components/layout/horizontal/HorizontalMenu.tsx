// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Type Imports
import type { getDictionary } from '@/utils/getDictionary'
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import HorizontalNav, { Menu, SubMenu, MenuItem } from '@menu/horizontal-menu'
import VerticalNavContent from './VerticalNavContent'
import CustomChip from '@core/components/mui/Chip'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'
import { useSettings } from '@core/hooks/useSettings'

// Styled Component Imports
import StyledHorizontalNavExpandIcon from '@menu/styles/horizontal/StyledHorizontalNavExpandIcon'
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/horizontal/menuItemStyles'
import menuRootStyles from '@core/styles/horizontal/menuRootStyles'
import verticalNavigationCustomStyles from '@core/styles/vertical/navigationCustomStyles'
import verticalMenuItemStyles from '@core/styles/vertical/menuItemStyles'
import verticalMenuSectionStyles from '@core/styles/vertical/menuSectionStyles'

type RenderExpandIconProps = {
  level?: number
}

type RenderVerticalExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

const RenderExpandIcon = ({ level }: RenderExpandIconProps) => (
  <StyledHorizontalNavExpandIcon level={level}>
    <i className='tabler-chevron-right' />
  </StyledHorizontalNavExpandIcon>
)

const RenderVerticalExpandIcon = ({ open, transitionDuration }: RenderVerticalExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const HorizontalMenu = ({ dictionary }: { dictionary: Awaited<ReturnType<typeof getDictionary>> }) => {
  // Hooks
  const verticalNavOptions = useVerticalNav()
  const theme = useTheme()
  const { settings } = useSettings()
  const params = useParams()

  // Vars
  const { skin } = settings
  const { transitionDuration } = verticalNavOptions
  const { lang: locale } = params

  return (
    <HorizontalNav
      switchToVertical
      verticalNavContent={VerticalNavContent}
      verticalNavProps={{
        customStyles: verticalNavigationCustomStyles(verticalNavOptions, theme),
        backgroundColor:
          skin === 'bordered' ? 'var(--mui-palette-background-paper)' : 'var(--mui-palette-background-default)'
      }}
    >
      <Menu
        rootStyles={menuRootStyles(theme)}
        renderExpandIcon={({ level }) => <RenderExpandIcon level={level} />}
        menuItemStyles={menuItemStyles(theme, 'tabler-circle')}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        popoutMenuOffset={{
          mainAxis: ({ level }) => (level && level > 0 ? 14 : 12),
          alignmentAxis: 0
        }}
        verticalMenuProps={{
          menuItemStyles: verticalMenuItemStyles(verticalNavOptions, theme),
          renderExpandIcon: ({ open }) => (
            <RenderVerticalExpandIcon open={open} transitionDuration={transitionDuration} />
          ),
          renderExpandedMenuItemIcon: { icon: <i className='tabler-circle text-xs' /> },
          menuSectionStyles: verticalMenuSectionStyles(verticalNavOptions, theme)
        }}
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
          <MenuItem className='normal-case' href={`#`}>
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
    </HorizontalNav>
  )
}

export default HorizontalMenu
