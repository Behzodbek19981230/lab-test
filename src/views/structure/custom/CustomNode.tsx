import React from 'react'

import { Handle, Position } from '@xyflow/react'
import { Typography } from '@mui/material'

interface CustomNodeData {
  label: string
  value: string
}

const CustomNode = ({ data }: { data: CustomNodeData }) => {
  return (
    <div className='border rounded-sm p-4'>
      <Handle type='target' position={Position.Top} id='top-target' />
      <Handle type='source' position={Position.Top} id='top-source' />

      <div className='flex flex-col px-3'>
        <Typography className='text-lg text-center font-semibold'>{data.label}</Typography>
        <Typography className='text-sm text-center font-medium'>{data.value}</Typography>
      </div>

      <Handle type='target' position={Position.Bottom} id='bottom-target' />
      <Handle type='source' position={Position.Bottom} id='bottom-source' />

      <Handle type='target' position={Position.Left} id='left-target' />
      <Handle type='source' position={Position.Left} id='left-source' />

      <Handle type='target' position={Position.Right} id='right-target' />
      <Handle type='source' position={Position.Right} id='right-source' />
    </div>
  )
}

export default CustomNode
