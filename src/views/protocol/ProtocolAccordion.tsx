'use client'

// React Imports
import { useState } from 'react'
import type { SyntheticEvent } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Accordion from '@mui/material/Accordion'
import Divider from '@mui/material/Divider'

import Typography from '@mui/material/Typography'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import classname from 'classnames'

// Type Imports
import { Button } from '@mui/material'

import ProtocolHead from '@/views/protocol/Protocolhead'
import ResultsTrying from '@/views/protocol/ResultTry'
import Responsibles from '@/views/protocol/Responsibles'
import ResponsiblePerson from '@/views/protocol/ResponsiblePerson'

// Vars

const ProtocolAccordion = () => {
  const [expanded, setExpanded] = useState<string | false>('panel1')

  const handleExpandChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Grid container gap={4}>
      <div className='w-full flex justify-end'>
        <Button variant='outlined' href='/bayonnoma.pdf' download target='_blank'>
          <i className='tabler-printer' />
        </Button>
      </div>
      <ProtocolHead />
      <Grid item xs={12} gap={0}>
        <Accordion expanded={expanded === 'panel1'} onChange={handleExpandChange('panel1')} className='m-0'>
          <AccordionSummary
            expandIcon={
              <i
                className={classname(
                  'tabler-chevron-right',
                  expanded === 'panel1' ? 'text-[var(--mui-palette-primary-contrastText)] ' : ''
                )}
              />
            }
            className={
              expanded === 'panel1'
                ? 'bg-primary text-[var(--mui-palette-primary-contrastText)] rounded-t '
                : 'bg-backgroundPaper rounded-t  '
            }
          >
            <Typography className='font-semibold text-lg'> Sinov bayonnomasi</Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails className='py-6 px-0'>
            <Grid container spacing={6} className='m-0 w-[100%]'>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>Sinov ishlari o’tkazilgan joy - </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>Tex-Sinov Service MCHJ, Toshkent sh, Olmazor tm., Farobiy 333a. </Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>Buyurtmachi rekvizitlari - </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>
                  Broker Service MCHJ, Toshkent sh, Sergili tm., Bunyodkor 21. h/r 20202080009850165554 Ipak Yo’li ATB
                  Sag’bon fl., Bank kodi 00125, STIR 123456789. Telefon +99871 123-45-67 Mobile +99897 000-00-00, fax
                  +99871 1234567, E-mail: texsinovservice@uzmail.uz{' '}
                </Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>
                  Maxsulotga qo’yiladigan talab bo’yicha me’yoriy hujjati nomi va bandi -
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>
                  ГОСТ 31996-2012 Кабели силовые с пластмассовой изоляцией на номинальное напряжение 0,66; 1 и 3 кв.
                  Общие технические условия. 3.1, 3.2, 4.3 Bandlari.
                </Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>
                  Sinov ob’ekti ma’lumotlari. Nomi -
                </Typography>
                <Typography className='font-semibold text-primary text-md'>Turi/modeli -</Typography>
                <Typography className='font-semibold text-primary text-md'>Ishlab chiqaruvchi mamlakat -</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>Misli ko’p tolali kuch kabeli</Typography>
                <Typography>ВВГ 5х75 mm ²</Typography>
                <Typography>Rossiya Federatsiyasi</Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>Ishlab chiqaruvchi korxona -</Typography>
                <Typography className='font-semibold text-primary text-md'>Zavod/identificatsiya raqami -</Typography>
                <Typography className='font-semibold text-primary text-md'>Ishlab chiqarilgan sana - </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>Moskva kabel zavodi OAJ </Typography>
                <Typography>1234567890</Typography>
                <Typography>01.2024</Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>
                  Maxsulot sinovga qabul qilingan sana -{' '}
                </Typography>
                <Typography className='font-semibold text-primary text-md'>
                  Sinov ishlari o’tkazilgan sana -{' '}
                </Typography>
                <Typography className='font-semibold text-primary text-md'>
                  Sinov bayonnomasi rasmiylashtirilgan sana -{' '}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>01.01.2024</Typography>
                <Typography>01.01.2024</Typography>
                <Typography>01.01.2024</Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>
                  Namuna olish bayonnomasi raqami № -
                </Typography>
                <Typography className='font-semibold text-primary text-md'>
                  Namuna olish bayonnomasi sanasi -
                </Typography>
                <Typography className='font-semibold text-primary text-md'>
                  Namuna oluvchi, sertifikatlash qarori -
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>№0123456789/UZ-01.24</Typography>
                <Typography>01.01.2024</Typography>
                <Typography>Uz TEST DM №125478/UE-147 01.01.2024y.</Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>
                  Sinov usulini belgilovchi me’yoriy hujjat nomi va bandi -
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>
                  ГОСТ 31996-2012 Кабели силовые с пластмассовой изоляцией на номинальное напряжение 0,66; 1 и 3 кв.
                  Общие технические условия. 9.1, 9.2, 9.3 Bandlari.
                </Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>
                  Sinov o’tkazilayotgan atrof muhit sharoitlari:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>Harorat - ̊C, nisbiy namlik - %, atmosfera bosimi - kPa(mmHg).</Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>I Asosiy sinov vositalari:</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography></Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              {/* </Grid>
                </Grid> */}
              {/* <Divider orientation='vertical' flexItem sx={{ px: 2 }} /> */}
              {/* <Grid item xs={12} md={5.9}>
                  <Grid container spacing={6}> */}
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>1. Sinov vositasi nomi -</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>Elektr o’lchash to’plami.</Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>Sinov vositasi turi - </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>K505</Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>Sinov vositasi zavod raqami - </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>№0123456789</Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>
                  Kalibrlash sertifikati raqami/sanasi -{' '}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>
                  №SN000005455123456789/01-24. 01.01.2023 sanadan. 01.01.2024 sanagacha amal qiladi.
                </Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>Kalibrlovchi metrologik xizmat -</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>UzMetrologxizmat MCHJ Toshkent sh., Yakkasaroy tm., Bobur kch. 14</Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>
                  Akkreditatsiya haqida govohnoma -
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>№O’Z.AKK.KL 00112 - 01.01.2024 y.</Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>Metrologik tavsiflari -</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>O’K 3×0-600 V; 3×0-10 A; 50 Hz; 0-600 A; AS 0,5</Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>2. Sinov vositasi nomi - </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>Megaommetr </Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>Sinov vositasi turi - </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>M4100/1 </Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>Sinov vositasi zavod raqami - </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>№0123456789 </Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>
                  Kalibrlash sertifikati raqami/sanasi -{' '}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>
                  №SN000005455123456789/01-24. 01.01.2023 sanadan. 01.01.2024 sanagacha amal qiladi.{' '}
                </Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>Kalibrlovchi metrologik xizmat -</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>UzMetrologxizmat MCHJ Toshkent sh., Yakkasaroy tm., Bobur kch. 14 </Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>

              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>
                  Akkreditatsiya haqida govohnoma -
                </Typography>
              </Grid>

              <Grid item xs={12} sm={9}>
                <Typography>№O’Z.AKK.KL 00112 - 01.01.2024 y. </Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>Metrologik tavsiflari -</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>O’K 0-2000 MΩ; 1000 V; AS 1,0 </Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              {/* </Grid>
                </Grid> */}
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel2'} onChange={handleExpandChange('panel2')} className='m-0'>
          <AccordionSummary
            expandIcon={
              <i
                className={classname(
                  'tabler-chevron-right',
                  expanded === 'panel2' ? 'text-[var(--mui-palette-primary-contrastText)]' : ''
                )}
              />
            }
            className={
              expanded === 'panel2'
                ? 'bg-primary text-[var(--mui-palette-primary-contrastText)] '
                : 'bg-backgroundPaper'
            }
          >
            <Typography className='font-semibold text-lg'> Sinash natijalari</Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails className='p-0'>
            <ResultsTrying />
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel3'} onChange={handleExpandChange('panel3')} className='m-0'>
          <AccordionSummary
            expandIcon={
              <i
                className={classname(
                  'tabler-chevron-right',
                  expanded === 'panel3' ? 'text-[var(--mui-palette-primary-contrastText)]' : ''
                )}
              />
            }
            className={
              expanded === 'panel3'
                ? 'bg-primary text-[var(--mui-palette-primary-contrastText)] '
                : 'bg-backgroundPaper'
            }
          >
            <Typography className='font-semibold text-lg'>
              {' '}
              Talablar yoki spetsifikstsiya bo’yicha muvofiqlik tasdiqlash to’grisida bayonot
            </Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails className='py-6 px-0'>
            <Grid container spacing={6} className='m-0 w-[100%]'>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>
                  Sinov ob’ekti ma’lumotlari. Nomi -
                </Typography>
                <Typography className='font-semibold text-primary text-md'>Turi/modeli - </Typography>
                <Typography className='font-semibold text-primary text-md'>Zavod/identificatsiya raqami - </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>Misli ko’p tolali kuch kabeli</Typography>
                <Typography>ВВГ 5х75 mm ²</Typography>
                <Typography>Rossiya Federatsiyasi</Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>
                  Maxsulotga qo’yiladigan talab bo’yicha me’yoriy hujjati nomi va bandi -
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>
                  ГОСТ 31996-2012 Кабели силовые с пластмассовой изоляцией на номинальное напряжение 0,66; 1 и 3 кв.
                  Общие технические условия. 3.1, 3.2, 4.3 Bandlari.{' '}
                </Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>
                  Sinovlar natijasida aniqlangan tavsiflar -
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>Izolyatsiyaning elektr mustahkamligi va izolyatsiya qarshiligi</Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>
                  Muvofiqlikni baholashda qollanilgan hujjat
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>
                  ILAC-G8:09/2019 (1-jadval bo’yicha: yolg’on habar qabul qilish ehtimoliy spetsifik havf 5 %)
                </Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={handleExpandChange('panel4')} className='m-0'>
          <AccordionSummary
            expandIcon={
              <i
                className={classname(
                  'tabler-chevron-right',
                  expanded === 'panel4' ? 'text-[var(--mui-palette-primary-contrastText)]' : ''
                )}
              />
            }
            className={
              expanded === 'panel4'
                ? 'bg-primary text-[var(--mui-palette-primary-contrastText)] '
                : 'bg-backgroundPaper'
            }
          >
            <Typography className='font-semibold text-lg'> Qo’shimcha talablar</Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails className='py-6 px-0'>
            <Grid container spacing={6} className='m-0 w-[100%]'>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>
                  Talqin qilish va interpretatsiya ma’lumotlari -
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}></Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>Qo’shimcha ma’lumotlari - </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography></Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel5'} onChange={handleExpandChange('panel5')} className='m-0'>
          <AccordionSummary
            expandIcon={
              <i
                className={classname(
                  'tabler-chevron-right',
                  expanded === 'panel5' ? 'text-[var(--mui-palette-primary-contrastText)]' : ''
                )}
              />
            }
            className={
              expanded === 'panel5'
                ? 'bg-primary text-[var(--mui-palette-primary-contrastText)] '
                : 'bg-backgroundPaper'
            }
          >
            <Typography className='font-semibold text-lg'> Talablar</Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails className='py-6 px-0'>
            <Grid container spacing={6} className='m-0 w-[100%]'>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>
                  1. Sinov natijalarining taalluuqliligi -
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>
                  Sinov natijalarining faqatgina ushbu sinov o’tkazilgan namunalar uchungina taalluuqlidir.
                </Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>
                  2. Sinov natijalari hisobotidan foydalanish -{' '}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>
                  Ushbu sinov bayonnomasi to’liq bo’lmagan xolda yoki alohida qisimlari qollanilishi mumkin emas va
                  faqatgina to’liq holda qollash talab etiladi.
                </Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>
                  3. Sinov usulidan og’ish, chetlashish yoki qo’shimcha qilish bo’yicha alohida ma’lumotlar -
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>Mavjud emas.</Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel6'} onChange={handleExpandChange('panel6')} className='m-0'>
          <AccordionSummary
            expandIcon={
              <i
                className={classname(
                  'tabler-chevron-right',
                  expanded === 'panel6' ? 'text-[var(--mui-palette-primary-contrastText)]' : ''
                )}
              />
            }
            className={
              expanded === 'panel6'
                ? 'bg-primary text-[var(--mui-palette-primary-contrastText)] '
                : 'bg-backgroundPaper'
            }
          >
            <Typography className='font-semibold text-lg'>
              {' '}
              Tashqi etkazib beruvchilardan olingan sinov natijalari{' '}
            </Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails className='py-6 px-0'>
            <Grid container spacing={6} className='m-0 w-[100%]'>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>
                  1. Tashqi etkazib beruvchi to’g’risidagi ma’lumotlar -
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography></Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>
                  2. Taqdim etilayotgan sinov korsatgichlari -
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>
                  Ushbu sinov bayonnomasi to’liq bo’lmagan xolda yoki alohida qisimlari qollanilishi mumkin emas va
                  faqatgina to’liq holda qollash talab etiladi.
                </Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={3} className='text-right'>
                <Typography className='font-semibold text-primary text-md'>
                  3. Taqdim etilayotgan hujjat raqami va sanasi -
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>№Sl0123456789/01-24 01.01.2024 sanadagi sinov bayonnomasi.</Typography>
              </Grid>
              <Grid item xs={12} className='px-0 py-3'>
                <Divider />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel7'} onChange={handleExpandChange('panel7')} className='m-0'>
          <AccordionSummary
            expandIcon={
              <i
                className={classname(
                  'tabler-chevron-right',
                  expanded === 'panel7' ? 'text-[var(--mui-palette-primary-contrastText)]' : ''
                )}
              />
            }
            className={
              expanded === 'panel7'
                ? 'bg-primary text-[var(--mui-palette-primary-contrastText)] '
                : 'bg-backgroundPaper rounded-b'
            }
          >
            <Typography className='font-semibold text-lg'>
              {' '}
              Sinov laboratoriyasi uchun mas’ul shaxs javobgarligi{' '}
            </Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails className='py-6 px-0'>
            <Responsibles />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel8'} onChange={handleExpandChange('panel8')} className='m-0'>
          <AccordionSummary
            expandIcon={
              <i
                className={classname(
                  'tabler-chevron-right',
                  expanded === 'panel8' ? 'text-[var(--mui-palette-primary-contrastText)]' : ''
                )}
              />
            }
            className={
              expanded === 'panel8'
                ? 'bg-primary text-[var(--mui-palette-primary-contrastText)] '
                : 'bg-backgroundPaper rounded-b'
            }
          >
            <Typography className='font-semibold text-lg'>Sinovlarni amalga oshirgam shaxs</Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails className='py-6 px-0'>
            <ResponsiblePerson />
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12} className='flex justify-end'>
        <Button variant='outlined' color='primary'>
          Sinov natijalarining bayonnomasini tasdiqlash
        </Button>
      </Grid>
    </Grid>
  )
}

export default ProtocolAccordion
