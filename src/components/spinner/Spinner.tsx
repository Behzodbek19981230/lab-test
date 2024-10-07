import React from 'react'

import '@components/spinner/WhisperSpinner.css'

interface WhisperSpinnerProps {
  size?: number

  loading?: boolean
  sizeUnit?: string
  width?: number
  height?: number
  sizeHeight?: string
}

const getBalls = ({
  countBallsInLine,
  size,
  sizeUnit
}: {
  countBallsInLine: number

  size: number
  sizeUnit: string
}) => {
  const balls = []
  let keyValue = 0

  for (let i = 0; i < countBallsInLine; i++) {
    for (let j = 0; j < countBallsInLine; j++) {
      balls.push(
        <div
          className={`ball animation-motion`}
          style={{
            margin: `${size / 15}${sizeUnit}`,
            width: `${size / 5}${sizeUnit}`,
            height: `${size / 5}${sizeUnit}`
          }}
          key={keyValue.toString()}
        />
      )
      keyValue++
    }
  }

  return balls
}

export const Spinner: React.FC<WhisperSpinnerProps> = ({
  size = 50,
  sizeUnit = 'px',
  width = '100%',
  sizeHeight,
  height = 400
}) => {
  const countBallsInLine = 3

  return (
    <div className='flex items-center justify-center ' style={{ width: width, height: sizeHeight ?? height }}>
      <div
        className='relative animate-spin'
        style={{
          width: `${size}${sizeUnit}`,
          height: `${size}${sizeUnit}`
        }}
      >
        {getBalls({
          countBallsInLine,
          size,
          sizeUnit
        })}
      </div>
    </div>
  )
}
