import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

type TableDataType = {
  id: number
  type: string
  app: boolean
  email: boolean
  browser: boolean
}

// Vars
const tableData: TableDataType[] = [
  {
    app: false,
    email: true,
    browser: false,
    type: 'Sinov laboratoriyasi ushbu sinov bayonnomasida takidlangan barcha ma’lumotlar uchun javobgar ',
    id: 1
  },
  {
    app: true,
    id: 2,
    email: false,
    browser: true,
    type: 'Quyida buyurtmachi tomonidan taqdim etilgan ma’lumotlar bo’yicha sinov laboratoriyasi javobgar emas:- '
  },
  {
    app: true,
    id: 3,
    email: true,
    browser: true,
    type: 'Buyurtmachi taqdim etgan ma’lumotlar sinov natijalari haqqoniyligiga ta’sir o’tkazmaydi;'
  },
  {
    app: false,
    id: 4,
    email: false,
    browser: true,
    type: 'Buyurtmachi taqdim etgan ma’lumotlar sinov natijalari haqqoniyligiga ta’sir etishi sababli, sinov laboratoriyasi quyidagi holatlar bo’yicha javobgarlikni cheklaydi: -'
  },
  {
    app: false,
    id: 5,
    email: false,
    browser: true,
    type: 'Sinov laboratoriyasi namuna olish ishlarini olib bormagan va namuna olish sharoiti va jarayoni uchun javobgarlikni olmaydi. Shu sababdan sinov natijalari faqatgina sinovga taqdim etilgan sinov ob’ektlari uchungina taallyqlidir. '
  }
]

const Responsibles = () => {
  return (
    <>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>T/R</th>
              <th>Nomi</th>
              <th></th>
            </tr>
          </thead>
          <tbody className='border-be'>
            {tableData.map((data, index) => (
              <tr key={index}>
                <td>{data.id}</td>
                <td>
                  <Typography color='text.primary' className='max-w-[50%] text-wrap'>
                    {data.type}
                  </Typography>
                </td>

                <td>
                  <Checkbox defaultChecked={data.browser} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex items-center justify-end p-3'>
        <Button variant='contained' type='submit'>
          Save Changes
        </Button>
      </div>
    </>
  )
}

export default Responsibles
