'use client'
import React, { useState, useCallback } from 'react'

import { ReactFlow, ReactFlowProvider, useNodesState, useEdgesState, addEdge, useReactFlow, Panel } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Button, Card, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material'

import CustomNode from '@/views/structure/custom/CustomNode'
import '@/views/structure/custom/index.css'
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import CustomTextField from '@/@core/components/mui/TextField'

const flowKey = 'example-flow'

const getNodeId = () => `randomnode_${+new Date()}`

const initialNodes: any = []

const nodeTypes = {
  multiHandleNode: CustomNode
}

const initialEdges: any = []

const SaveRestore = () => {
  const [open, setOpen] = useState(false)

  const [state, setState] = useState({
    name: '',
    title: ''
  })

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [rfInstance, setRfInstance] = useState<any>(null)
  const { setViewport } = useReactFlow()

  const onConnect = useCallback(
    (params: any) => setEdges(eds => addEdge({ ...params, type: 'smoothstep' }, eds)),
    [setEdges]
  )

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject()

      localStorage.setItem(flowKey, JSON.stringify(flow))
    }
  }, [rfInstance])

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey) as string)

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport

        setNodes(flow.nodes || [])
        setEdges(flow.edges || [])
        setViewport({ x, y, zoom })
      } else {
        setNodes(initialNodes)
        setEdges([])
      }
    }

    restoreFlow()
  }, [setNodes, setViewport, setEdges])

  const onAdd = () => {
    const newNodeId = getNodeId()

    const newNode = {
      id: newNodeId,
      data: { label: state.name, value: state.title },
      position: {
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400
      },
      type: 'multiHandleNode'
    }

    const newEdge: any = {
      id: `e${newNodeId}-1`,
      target: newNodeId,
      type: 'smoothstep'
    }

    setNodes(nds => nds.concat(newNode))
    setEdges(eds => eds.concat(newEdge))
    setOpen(false)
    setState({ name: '', title: '' })
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={setRfInstance}
      fitView
      fitViewOptions={{ padding: 2 }}
    >
      <Panel position='top-right' className='flex gap-3'>
        <Button variant='outlined' onClick={onSave}>
          Saqlash
        </Button>
        <Button variant='outlined' onClick={onRestore}>
          Qaytarish
        </Button>
        <Button variant='outlined' onClick={() => setOpen(true)} startIcon={<i className='tabler-plus' />}>
          Qo`shish
        </Button>
      </Panel>
      <Dialog open={open} onClose={() => setOpen(false)} sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}>
        <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
          <i className='tabler-x' />
        </DialogCloseButton>
        <DialogTitle
          variant='h4'
          className='flex flex-col gap-2 text-center p-6 sm:pbs-16 sm:pbe-6 sm:pli-16'
        ></DialogTitle>
        <form>
          <DialogContent className='overflow-visible pbs-0 p-6 sm:pli-16'>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  name='number'
                  autoComplete='off'
                  label='Lavozim nomi'
                  placeholder='Lavozim nomi'
                  value={state.name}
                  onChange={e => setState({ ...state, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  name='name'
                  label='FIO'
                  autoComplete='off'
                  placeholder='FIO'
                  value={state.title}
                  onChange={e => setState({ ...state, title: e.target.value })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className='justify-center pbs-0 p-6 sm:pbe-16 sm:pli-16'>
            <Button variant='contained' type='button' onClick={onAdd}>
              Add
            </Button>
            <Button variant='tonal' type='reset' color='secondary' onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </ReactFlow>
  )
}

export default function DnDFlows() {
  return (
    <Card>
      <CardHeader title='Structure Detail' />
      <div style={{ height: '600px', width: '100%' }}>
        <ReactFlowProvider>
          <SaveRestore />
        </ReactFlowProvider>
      </div>
    </Card>
  )
}
