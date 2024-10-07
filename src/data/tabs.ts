export type tabsDataType = {
  label: string
  value: string
  children: {
    label: string
    value: string
  }[]
}
export type devicesDataType = {
  label: string
  value: string
}
export const tabsData: tabsDataType[] = [
  {
    label: "O'V qiyoslash",
    value: 'qiyoslash',
    children: [
      { label: 'Birlamchi qiyoslash', value: 'birlamchi-qiyoslash' },
      { label: 'Davriy qiyoslash', value: 'davriy-qiyoslash' },
      { label: 'Ekspert qiyoslash', value: 'expert-qiyoslash' }
    ]
  },
  {
    label: 'Metrologik attestatlash',
    value: 'metrologik-attestatlash',
    children: [
      { label: 'O’lchash vositasini attestatsiyadan o’tkazish', value: 'attestatsiyadan-otkazish' },

      { label: 'Sinash qurilmalarini birlamchi attestatlash', value: 'birlamchi-attestatlash' },
      { label: 'Sinash qurilmalarini davriy attestatlash', value: 'davriy-attestatlash' },
      {
        label: "O’lchash komplekslarini metrologik attestatsiyadan o'tkazish",
        value: 'olchash-komplekslarini-metrologik-attestatsiyadan-otkazish'
      },
      { label: 'Standart namunani attestatlash', value: 'standart-namunani-attestatlash' }
    ]
  },
  {
    label: 'Kalibrlash',
    value: 'kalibrlash',
    children: [{ label: 'O’lchash vositasini kalibrlash', value: 'olchash-vositasini-kalibrlash' }]
  },
  {
    label: 'Tur tasdiqlash',
    value: 'tur-tasdiqlash',
    children: [
      {
        label: 'O’lchash vositasini turini tasdiqlash davlat sinovlaridan o’tkazish',
        value: 'olchash-vositasini-turini-tasdiqlash-davlat-sinovlaridan-otkazish'
      },
      {
        label: 'O’lchash vositasini metrologik tekshiruv hujjatlarini etirof etish',
        value: 'olchash-vositasini-metrologik-tekshiruv-hujjatlarini-etirof-etish'
      }
    ]
  },
  {
    label: 'Metrologik hujjatlar',
    value: 'metrologik-hujjatlar',
    children: [
      {
        label: 'Metrologiya sohasiga oid hujjat ishlab chiqish',
        value: 'metrologiya-sohasiga-oid-hujjat-ishlab-chiqish'
      },
      {
        label: 'Hujjatlarni metrologik ekspertizadan o’tkazish',
        value: 'hujjatlarni-metrologik-ekspertizadan-otkazish'
      },
      {
        label: 'O’lchashlarni bajarish uslubiyatini attestatlash',
        value: 'olchashlarni-bajarish-uslubiyatini-attestatlash'
      }
    ]
  },
  {
    label: 'Provayderlik',
    value: 'provayderlik',
    children: [
      {
        label: 'Malakani baholash provayderlik laboratoriyalararo solishtirish',
        value: 'malakani-baholash-provayderlik-laboratoriyalararo-solishtirish'
      }
    ]
  },
  {
    label: 'Yillik shartnoma jadval',
    value: 'shartnoma-jadval',
    children: [
      {
        label: 'Metrologik tekshiruvlar reja-jadvalini tasdiqlash',
        value: 'metrologik-tekshiruvlar-reja-jadvalini-tasdiqlash'
      },
      {
        label: 'Metrologik tekshiruv ishlari uchun yillik shartnoma tuzish',
        value: 'yillik-shartnoma-tuzish'
      }
    ]
  }
]
export const deviceTabData: devicesDataType[] = [
  {
    label: 'Ishchi holatda',
    value: 'ishchi-holatda'
  },
  {
    label: 'Saqlashda',
    value: 'saqlashda'
  },
  {
    label: "Ta'mirlashda",
    value: 'tamirlashda'
  },
  {
    label: "Texnik xizmat ko'rsatish",
    value: 'texnik-xizmat-korsatish'
  },
  {
    label: 'Metrologik tekshiruvda',
    value: 'metrologik-tekshiruvda'
  }
]
