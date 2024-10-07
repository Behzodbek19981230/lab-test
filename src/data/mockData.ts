export interface DashboardBarChartData {
  id: number
  name: string
  prosent: number
  color: string
  children: {
    id: number
    name: string
    count: number
  }[]
}

const dashboardBarChartData = [
  {
    id: 1,
    name: 'Kelib tushgan arizalar',
    prosent: 40,
    color: 'primary',
    children: [
      {
        id: 1,
        name: 'Kelib tushgan arizalar ',
        count: 900
      },
      {
        id: 2,
        name: 'Ijroga qabul qilingan arizalar ',
        count: 524
      },
      {
        id: 3,
        name: 'Sinovga taqdim etilgan mahsulotlar ',
        count: 400
      },
      {
        id: 4,
        name: 'O`tkazilgan sinovlar ',
        count: 1200
      },
      {
        id: 5,
        name: 'Yaroqsiz mahsulotlar ',
        count: 20
      }
    ]
  },
  {
    id: 3,
    name: 'Ish yakunlangan arizalar',
    prosent: 60,
    color: 'success',
    children: [
      {
        id: 1,
        name: 'Yaroqli deb topilgan ',
        count: 200
      },
      {
        id: 2,
        name: 'Yaroqsiz deb topilgan ',
        count: 20
      },
      {
        id: 3,
        name: 'Bekor qilingan ',
        count: 100
      }
    ]
  },
  {
    id: 2,
    name: 'Ijro etilayotgan arizalar',
    prosent: 30,
    color: 'blue',
    children: [
      {
        id: 1,
        name: 'Qabul qilingan arizalar ',
        count: 600
      },
      {
        id: 2,
        name: 'Shartnoma tuzilgan arizalar ',
        count: 300
      },
      {
        id: 3,
        name: 'Sinov o`tkazilayotgan arizalar arizalar ',
        count: 200
      },
      {
        id: 4,
        name: 'Rad etilganlar ',
        count: 1000
      }
    ]
  }
]

export { dashboardBarChartData }
