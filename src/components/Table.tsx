import React from 'react'

import MUITable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

type Column<T> = {
  header: () => React.ReactNode
  cell: (row: T) => React.ReactNode
}

type TableSimpleProps<T> = {
  columns: Column<T>[]
  data: T[]
}

export default function TableSimple<T>({ columns, data }: TableSimpleProps<T>) {
  return (
    <TableContainer>
      <MUITable aria-label='simple table'>
        <TableHead className='border bg-primaryLighter'>
          <TableRow>
            {columns.map((column, i) => (
              <TableCell align='center' className='font-semibold' key={i}>
                {column.header()}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, i) => (
            <TableRow
              key={i}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              {columns.map((column, j) => (
                <TableCell align='center' key={j}>
                  {column.cell(row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MUITable>
    </TableContainer>
  )
}
