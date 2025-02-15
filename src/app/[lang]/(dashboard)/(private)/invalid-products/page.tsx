// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports

// Data Imports
import { getInvoiceData } from '@/app/server/actions'
import InvalidProductsList from '@/views/invalid-products/InvalidProductsList'

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/apps/invoice` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */

/* const getInvoiceData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/invoice`)

  if (!res.ok) {
    throw new Error('Failed to fetch invoice data')
  }

  return res.json()
} */

const InvalidProducts = async () => {
  // Vars
  const data = await getInvoiceData()

  return (
    <Grid container>
      <Grid item xs={12}>
        <InvalidProductsList invoiceData={data} />
      </Grid>
    </Grid>
  )
}

export default InvalidProducts
