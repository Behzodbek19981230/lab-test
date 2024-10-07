'use client'

// React Imports
import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'

// Third-party Imports

import Image from 'next/image'

import styled from '@emotion/styled'

// Type Imports
import { useColorScheme } from '@mui/material'

import type { VerticalNavContextProps } from '@menu/contexts/verticalNavContext'

// Component Imports
// import VuexyLogo from '@core/svg/Logo'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'
import { useSettings } from '@core/hooks/useSettings'

type LogoTextProps = {
  isHovered?: VerticalNavContextProps['isHovered']
  isCollapsed?: VerticalNavContextProps['isCollapsed']
  transitionDuration?: VerticalNavContextProps['transitionDuration']
  color?: CSSProperties['color']
}

const LogoText = styled.span<LogoTextProps>`
  color: ${({ color }) => color ?? 'var(--mui-palette-text-primary)'};
  font-size: small;
  font-weight: 500;
  letter-spacing: 0.25px;
  transition: ${({ transitionDuration }) =>
    `margin-inline-start ${transitionDuration}ms ease-in-out, opacity ${transitionDuration}ms ease-in-out`};

  ${({ isHovered, isCollapsed }) =>
    isCollapsed && !isHovered ? 'opacity: 0; margin-inline-start: 0;' : 'opacity: 1; margin-inline-start: 12px;'}
`

const Logo = ({ color }: { color?: CSSProperties['color'] }) => {
  // Refs
  const { settings } = useSettings()

  const logoTextRef = useRef<HTMLSpanElement>(null)

  const { mode: muiMode } = useColorScheme()

  const _mode = (muiMode === 'system' ? settings.mode : muiMode) || settings.mode

  // Hooks
  const { isHovered, transitionDuration } = useVerticalNav()

  // Vars
  const { layout } = settings

  useEffect(() => {
    if (layout !== 'collapsed') {
      return
    }

    if (logoTextRef && logoTextRef.current) {
      if (layout === 'collapsed' && !isHovered) {
        logoTextRef.current?.classList.add('hidden')
      } else {
        logoTextRef.current.classList.remove('hidden')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered, layout])

  return (
    <div className='flex items-center'>
      {/* <VuexyLogo className='text-2xl text-primary' /> */}
      <Image
        src={_mode === 'light' ? '/images/logos/figma.png' : '/images/logos/figma.png'}
        width={60}
        height={60}
        alt={''}
      />
      <LogoText
        className='italic text-primary font-bold text-[16px]'
        color={color}
        ref={logoTextRef}
        isHovered={isHovered}
        isCollapsed={layout === 'collapsed'}
        transitionDuration={transitionDuration}
      >
        {themeConfig.templateName}
      </LogoText>
    </div>
  )
}

export default Logo
