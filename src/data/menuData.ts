import type { IMenuData } from '@/utils/interfaces'

const menuData: IMenuData[] = [
  {
    path: `/dashboard`,
    title: 'Bosh sahifa',
    icon: 'tabler-home-stats',
    role: ['admin', 'akkreditatsiya', 'uzstandart', 'korxona rahbari', 'labaratoriya boshliq']
  },
  {
    path: `/applications`,
    title: 'Arizalar',
    icon: 'tabler-file-description',
    suffix: 5800,
    children: [
      { path: `/applications`, title: 'Incoming' },
      { path: `/applications/accepted`, title: 'accepted' }
    ],
    role: [
      'admin',
      'akkreditatsiya',
      'uzstandart',
      'korxona rahbari',
      'labaratoriya boshliq',
      'auditor',
      'byuro',
      'labaratoriya mutahasis'
    ]
  },
  {
    title: 'GeneralRequirements',
    icon: 'tabler-clipboard-list',
    children: [
      {
        path: `/objectivity`,
        title: 'Objectivity',
        children: [
          {
            path: `/objectivity/attachment`,
            title: 'Attachment'
          },
          {
            path: `/objectivity/states`,
            title: 'Satates'
          },
          {
            path: `/objectivity/events`,
            title: 'Events'
          }
        ]
      },
      { path: `#`, title: 'Security' }
    ],
    role: ['admin', 'akkreditatsiya', 'uzstandart', 'korxona rahbari', 'labaratoriya boshliq']
  },
  {
    path: `/structure`,
    title: 'Tashkilot tuzilmasi',
    icon: 'tabler-sitemap',
    role: ['admin', 'akkreditatsiya', 'uzstandart', 'korxona rahbari', 'labaratoriya boshliq']
  },
  {
    path: `/resources`,
    title: 'Resurslar',
    icon: 'tabler-server-cog',
    children: [
      {
        path: `/staff`,
        title: 'staff',
        children: [
          {
            path: `/staff/tasks`,
            title: 'tasks'
          },
          {
            path: `/staff/upgrade`,
            title: 'upgrade'
          }
        ]
      },
      { path: `/products/accepted`, title: 'TestRooms' },
      { path: `/devices`, title: 'Devices' },
      { path: `#`, title: 'RegulatoryDocuments' },
      { path: `#`, title: 'MetrologicalTraceability' },
      { path: `#`, title: 'ForeignService' }
    ],
    role: ['admin', 'akkreditatsiya', 'uzstandart', 'labaratoriya boshliq', 'korxona rahbari']
  },
  {
    title: 'MainProcess',
    icon: 'tabler-dashboard',
    children: [
      { path: `#`, title: 'Talabnoma' },
      { path: `#`, title: 'Tendr' },
      { path: `#`, title: 'Usullarni tanlash' },
      { path: `#`, title: 'Muvofiqlikni baholash' },
      { path: `#`, title: 'Verifikasiya' },
      { path: `#`, title: 'Namuna olish' },
      {
        title: 'products',
        children: [
          { path: `/products/accepted`, title: 'accepted' },
          { path: `/products/labaratory`, title: 'labaratoryProductsStatus' }
        ]
      },
      {
        path: '#',
        title: 'Texnik yozuvlar'
      },
      { path: `#`, title: 'Noaniqliklarni baholash' },
      { path: `#`, title: 'Haqqoniylikni ta’minlash' },
      {
        title: 'Complaints',
        children: [
          { path: `/complaints/incoming`, title: 'Incoming' },
          { path: `/complaints/response`, title: 'ResponseLetters' }
        ]
      },
      { path: `#`, title: 'Nomuvofiq ishlar' },
      { path: `#`, title: 'Axborot menejmenti' }
    ],
    role: ['admin', 'akkreditatsiya', 'uzstandart', 'labaratoriya boshliq', 'korxona rahbari']
  },
  {
    path: `/agreements`,
    title: 'Shartnomalar',
    icon: 'tabler-abacus',
    role: ['admin', 'korxona rahbari', 'labaratoriya boshliq', 'labaratoriya mutahasis']
  },
  {
    path: `/tariff`,
    title: 'Ta`rif',
    icon: 'tabler-calculator',
    role: ['admin', 'byuro', 'korxona rahbari', 'labaratoriya boshliq']
  },
  {
    title: 'monitoring',
    icon: 'tabler-device-analytics',
    children: [
      { path: `/monitoring/environmental-conditions`, title: 'EnvironmentalConditions' },
      { path: `/monitoring/environmental-norma`, title: 'Monitoring normasi' }
    ],
    role: ['admin', 'akkreditatsiya', 'uzstandart', 'korxona rahbari', 'labaratoriya boshliq']
  },
  {
    path: `/protocol/list`,
    title: 'protocols',
    icon: 'tabler-checkup-list',
    role: ['admin', 'akkreditatsiya', 'uzstandart', 'labaratoriya boshliq', 'korxona rahbari', 'labaratoriya mutahasis']
  },
  {
    path: `/invalid-products`,
    title: 'InvalidProducts',
    icon: 'tabler-devices-x',
    role: ['admin', 'akkreditatsiya', 'uzstandart', 'labaratoriya boshliq', 'korxona rahbari']
  },
  {
    title: 'Menejment tizimi',
    icon: 'tabler-cpu',
    children: [
      { path: `/management/quality-documents`, title: 'Sifat menedjmenti hujjatlari' },
      { path: `/management/documents`, title: 'Hujjatlarni boshqarish' },
      { path: `/management/recording`, title: 'Yozuvlarni boshqarish' },
      { path: `/management/dealing-risk`, title: 'Xavf-xatar bilan ishlash' },
      { path: `/management/working-with-opportunities`, title: 'Imkoniyatlar bilan ishlash' },
      { path: `/management/improvement`, title: 'Yaxshilash' },
      { path: `/management/corrective-actions`, title: 'Tuzatuvchi harakatlar' },
      {
        title: 'Audit',
        children: [
          { path: `/audit/conducted-audits`, title: 'ConductedAudits' },
          { path: `/audit/periodic-audit`, title: 'PeriodicAudit' },
          { path: `/audit/internal-audit`, title: 'InternalAudit' },
          { path: `/audit/inspection-check`, title: 'InspectionCheck' }
        ]
      },
      {
        path: '/management/analysis',
        title: 'Rahbariyat tahlili'
      }
    ],
    role: ['admin', 'akkreditatsiya', 'uzstandart', 'korxona rahbari', 'labaratoriya boshliq']
  },
  {
    title: 'Murojaatlar',
    icon: 'tabler-message-2',
    children: [
      { path: `/appeals/incoming`, title: 'Kirish xatlari' },
      { path: `/appeals/outgoing`, title: 'Chiqish xatlari' }
    ],
    role: ['admin', 'korxona rahbari', 'labaratoriya boshliq']
  },
  {
    path: `/akkreditation`,
    title: 'akkreditatsiya',
    icon: 'tabler-letter-a',
    role: ['admin', 'akkreditatsiya', 'uzstandart', 'korxona rahbari', 'labaratoriya boshliq']
  },
  {
    path: `/pasport`,
    title: 'Pasport',
    icon: 'tabler-id',
    children: [
      { path: `/pasport/resurces`, title: 'Resurslar' },
      { path: `/pasport/personal`, title: 'Xodimlar haqida' },
      { path: `/pasport/rooms`, title: 'Xonalar haqida' },
      { path: `/pasport/equipments`, title: 'Jihozlar haqida' }
    ],
    role: ['admin', 'akkreditatsiya', 'uzstandart', 'korxona rahbari', 'labaratoriya boshliq']
  },
  {
    title: 'Xodimlar bilan ishlash',
    icon: 'tabler-users-group',
    path: '/#',
    role: ['admin', 'akkreditatsiya', 'uzstandart', 'korxona rahbari', 'labaratoriya boshliq']
  },
  {
    title: 'Qizil hudud',
    className: 'text-error',
    icon: 'tabler-alert-triangle',
    path: '/#',
    role: ['admin', 'akkreditatsiya', 'uzstandart', 'korxona rahbari', 'labaratoriya boshliq']
  }
]

export { menuData }
