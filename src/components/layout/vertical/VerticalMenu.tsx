'use client'
import { useParams } from 'next/navigation'

import { useTheme } from '@mui/material/styles'
import PerfectScrollbar from 'react-perfect-scrollbar'

import { Skeleton } from '@mui/material'

import type { getDictionary } from '@/utils/getDictionary'
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'
import { Menu, MenuItem, SubMenu } from '@menu/vertical-menu'
import useVerticalNav from '@menu/hooks/useVerticalNav'
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'
import useAuth from '@/hooks/useAuth'
import { menuData } from '@/data/menuData'
import type { IUserRole } from '@/utils/interfaces'
import CustomChip from '@/@core/components/mui/Chip'
import { getTranslation } from '@/configs/t'

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
  const { t } = getTranslation(dictionary)
  const { isBreakpointReached } = useVerticalNav()

  const { session, loading } = useAuth()

  const { transitionDuration } = verticalNavOptions
  const { lang: locale } = params

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  const filteredMenuData = menuData.filter(item => {
    if (item.role) {
      return item.role?.includes(session?.user?.role as IUserRole) ?? false
    }

    return false
  })

  if (loading) {
    return <Skeleton variant='rectangular' width='100%' height='80%' />
  }

  if (!session || !session.isLoggedIn) {
    return <p>Not authenticated</p>
  }

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
        {filteredMenuData.map(item =>
          item.children ? (
            <SubMenu
              key={item.title}
              label={t(item.title)}
              icon={<i className={item.icon} />}
              suffix={item.suffix ? <CustomChip label={item.suffix} size='small' color='error' round='true' /> : ''}
              className={item.className || 'normal-case'}
            >
              {item.children.map(child =>
                child.children ? (
                  <SubMenu
                    key={child.title}
                    label={t(child.title)}
                    suffix={
                      child.suffix ? <CustomChip label={child.suffix} size='small' color='error' round='true' /> : ''
                    }
                    className={child.className || 'normal-case'}
                  >
                    {child.children.map(grchild => (
                      <MenuItem
                        key={grchild.title}
                        href={`/${locale}${grchild.path}`}
                        className={grchild.className || 'normal-case'}
                        suffix={
                          grchild.suffix ? (
                            <CustomChip label={grchild.suffix} size='small' color='error' round='true' />
                          ) : (
                            ''
                          )
                        }
                      >
                        {t(grchild.title)}
                      </MenuItem>
                    ))}
                  </SubMenu>
                ) : (
                  <MenuItem
                    key={child.title}
                    href={`/${locale}${child.path}`}
                    className={child.className || 'normal-case'}
                    suffix={
                      child.suffix ? <CustomChip label={child.suffix} size='small' color='error' round='true' /> : ''
                    }
                  >
                    {t(child.title)}
                  </MenuItem>
                )
              )}
            </SubMenu>
          ) : (
            <MenuItem
              key={item.title}
              href={`/${locale}${item.path}`}
              icon={<i className={item.icon} />}
              className={item.className || 'normal-case'}
              suffix={item.suffix ? <CustomChip label={item.suffix} size='small' color='error' round='true' /> : ''}
            >
              {t(item.title)}
            </MenuItem>
          )
        )}
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
