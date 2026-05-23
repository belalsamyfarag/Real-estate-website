import { Project, TransparencyLog, PayoutHistory } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    titleAr: 'مجمع الواحة السكني',
    titleEn: 'Al-Waha Residential Complex',
    locationAr: 'حي النرجس، الرياض',
    locationEn: 'Al-Narjis, Riyadh',
    expectedReturn: 12.5,
    termMonths: 24,
    targetSAR: 5000000,
    raisedSAR: 3750000, // 75%
    investorsCount: 142,
    status: 'active',
    statusLabelAr: 'تمويل مباشر',
    statusLabelEn: 'Direct Funding',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFKrlycjCEiblCmIVdzz6TXDaSu086UBf1QPOF9to_EAlHx6k5MjqSfbjDUFVLD02RcfIG7QZDUlz7FQtScNat1RkyJFHGZpjbAqPkAC3E-OGXjJppNhAlCoOqcxsu1EUiv9w8bEJfVnDrSAmPT7ItBxWQq0O7jZM5_oJVObfNaBGnwFy4-PgPv0lYCvbQbS6_JTUKQc6uHp8fpsY7IWTehBl8WlndyV7EIEbklLBMcO3rh3MZJDJ_uFa5-eEGpR2lDoLJ6x5qC54',
    imageAlt: 'Modern Residential Complex',
    descriptionAr: 'وفرة المساحة والخصوصية والهدوء السكني بمزيج فريد من التصميم الهندسي والمعايير الإنشائية الراقية داخل الرياض.',
    descriptionEn: 'Abundance of space, privacy, and peaceful living inside Riyadh with premium aesthetics and high architectural luxury.',
    areaSqm: 6800,
    floorsCount: 6,
    deliveryDateAr: 'الربع الأول 2025',
    deliveryDateEn: 'Q1 2025',
    buildingGrade: 'Grade A',
    progress: {
      total: 75,
      breakdown: {
        foundation: 100,
        structure: 90,
        finishing: 35
      }
    },
    timeline: [
      { dateAr: 'يناير 2024', dateEn: 'January 2024', titleAr: 'بدء طرح التمويل', titleEn: 'Funding Launch', completed: true },
      { dateAr: 'مارس 2024', dateEn: 'March 2024', titleAr: 'إغلاق التمويل وبدء البناء', titleEn: 'Funding Closed & Construction Start', completed: true },
      { dateAr: 'نوفمبر 2024', dateEn: 'November 2024', titleAr: 'اكتمال الهيكل الخرساني', titleEn: 'Concrete Structure Complete', completed: true },
      { dateAr: 'مارس 2025', dateEn: 'March 2025', titleAr: 'تسليم الوحدات', titleEn: 'Unit Handover & Dividends', completed: false }
    ],
    mapCoordsUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5Tj9QCYE1_nSyCsnSx763K11d1KlBvAvgqEm2biPTMiHS171rnXGB03g4ONaD_Pnx0CHx5rJECQBIPoUnMva-Wmk5m92smg4F_DIuKN9olcUzgQ_5ezqh044fIefJEU2i8zEBg_epdYz3IN8Zpl3Ss1KH0F6ucWraFV4gIIn3ANQ1d9nFXD51z8WER51lIRhCzqPj4HvQqSwn_-1vPO-eAUSuiwro5oRWxfPoOHqQWkk4Q-xJtXMF1YQj1pyUBK7LgtgqqveiEn8',
    liveFeedUrl1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnSACXiS_fbc7QKTMkmDm-kJGBWZRF9-6UfJynDcKc72eLjRrHJM2jtbUgN_QPp0b0aJT8l3hK95K7GxE-i7zmVIOAQOpqqnJnC1pmf9MTOVlT20RsDyVMT2ME1X7lwOtYhhhwgMMpVsjDvNZmhMSehqcCqHenwgHKOk7ZYYAUaOGPSosZfiv7g5s7pWjwWecc0rtfXXnOZdNKPjSBq2haqz3VSlqVhwBBapDFXpQo0s3sxtWv2p6wwklBVXHtGMN8a1fab3ZNAbo',
    liveFeedLabel1Ar: 'كاميرا الواحة ٠١ - الهيكل الرئيسي',
    liveFeedLabel1En: 'Camera Al-Waha 01 - Main Structure',
    liveFeedUrl2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkzypV_G91tkxaPRSxWIwzoSqahlrE1hBDoNanmCCtXNVolzan3045MwmhCadBp2i8TCoGjsjPnzHade1hguvyJU0VhCp4yI1CtgeX_TsL35oLxrVu6uEhn-LTHpbT62b9GYcPhC_b5i5EDnioHMBV-KF1PIV_7G2x_auEGfGyILmG7T7OkF4eUKrVdbojVGf8ssG-7SP4UJiKpx56WTE-XAe6WSuUjW1emx5g1bjN3fVBWL-HXarxd_o5KJ2cVpB-MlM82JHcJ_4',
    liveFeedLabel2Ar: 'كاميرا الواحة ٠٢ - التشطيبات',
    liveFeedLabel2En: 'Camera Al-Waha 02 - Internal Finishing'
  },
  {
    id: 'p2',
    titleAr: 'مركز الأعمال الذكي',
    titleEn: 'Smart Business Hub',
    locationAr: 'مركز الملك عبدالله المالي، الرياض',
    locationEn: 'KAFD, Riyadh',
    expectedReturn: 14.2,
    termMonths: 36,
    targetSAR: 12000000,
    raisedSAR: 0, // 0%
    investorsCount: 0,
    status: 'upcoming',
    statusLabelAr: 'فرصة قادمة',
    statusLabelEn: 'Upcoming Opportunity',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD2a2ktSzwgn-p4MazGyngqQzZqfFSdJa7gzZZxRAzg2tIjaZ6XuYW6443cqellx_aT4snooVf8Xu2CRUTTg7FVQWwFXqdnJB5m6owqSzUhzqJ1hIcDaoOK45RnUgEFyrrIPZ_uUmb1-dvx6IVE5D5vt0ddyqBkkkGY43N2UmBtCTVH97bDcJ8nlRKMe_E86xIzkBbwZf-l2BVNXm79212cWzM_3SaYIU_dxVXalJBHc3vfChziLUo0UXSg58PtXvS7WEg-m-KYJs',
    imageAlt: 'Commercial Hub',
    descriptionAr: 'برج مكتبي رقمي ذكي يواكب متطلبات كبرى الشركات العالمية والناشئة، بقلب عصب الاقتصاد المالي بالرياض.',
    descriptionEn: 'A smart digital office tower catering to top international companies and startups, located in the prominent KAFD, Riyadh.',
    areaSqm: 12500,
    floorsCount: 22,
    deliveryDateAr: 'الربع الثالث 2026',
    deliveryDateEn: 'Q3 2026',
    buildingGrade: 'Grade A+',
    progress: {
      total: 0,
      breakdown: {
        foundation: 0,
        structure: 0,
        finishing: 0
      }
    },
    timeline: [
      { dateAr: 'يونيو 2024', dateEn: 'June 2024', titleAr: 'إطلاق الطرح التمويلي للجمهور', titleEn: 'Public Funding Release', completed: false },
      { dateAr: 'أغسطس 2024', dateEn: 'August 2024', titleAr: 'توقيع العقود والمقاولات', titleEn: 'Signing Contractor Agreements', completed: false }
    ],
    mapCoordsUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5Tj9QCYE1_nSyCsnSx763K11d1KlBvAvgqEm2biPTMiHS171rnXGB03g4ONaD_Pnx0CHx5rJECQBIPoUnMva-Wmk5m92smg4F_DIuKN9olcUzgQ_5ezqh044fIefJEU2i8zEBg_epdYz3IN8Zpl3Ss1KH0F6ucWraFV4gIIn3ANQ1d9nFXD51z8WER51lIRhCzqPj4HvQqSwn_-1vPO-eAUSuiwro5oRWxfPoOHqQWkk4Q-xJtXMF1YQj1pyUBK7LgtgqqveiEn8',
  },
  {
    id: 'p3',
    titleAr: 'منتجع البحر الأحمر',
    titleEn: 'Red Sea Resort',
    locationAr: 'أبحر الشمالية، جدة',
    locationEn: 'Obhur Al-Shamaliyah, Jeddah',
    expectedReturn: 11.8,
    termMonths: 18,
    targetSAR: 8000000,
    raisedSAR: 3600000, // 45%
    investorsCount: 89,
    status: 'active',
    statusLabelAr: 'فرصة مميزة',
    statusLabelEn: 'Premium Deal',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLBot4qsoR2qt71RpR_fUn7mtrCJP43OQYzPbu0bqFoz_n_GLKZja8jg6Dx55zvDMphJotrHiMXSS4KrJMPGG0FhPhnT82GMvdKG7ly_WtnMP9WLEiOpeUJB3S1coGsDJZcaO2DswaG3Fy4lgDUnn5lXGTnHK1fpdbzc-uX8_ethkO18cpwlr6GjEkz0T_R4mCf1jvbgTwuFX4499l1v59hQ9ruwT1O131Qa2Qej_tMLB9CgikmzVYkebYGUTP_loQ5b45XTQKM84',
    imageAlt: 'Beachfront Resort',
    descriptionAr: 'شاليهات وفلل بحرية تقدم رفاهية متكاملة وسياحة مستدامة وتطل مباشرة على المياه الفيروزية الساحرة لأبحر.',
    descriptionEn: 'Luxury marine chalets and villas offering absolute peace, integrated luxury, and direct turquoise sea views in Jeddah.',
    areaSqm: 15400,
    floorsCount: 3,
    deliveryDateAr: 'الربع الثاني 2025',
    deliveryDateEn: 'Q2 2025',
    buildingGrade: 'Premium Beach',
    progress: {
      total: 45,
      breakdown: {
        foundation: 100,
        structure: 60,
        finishing: 10
      }
    },
    timeline: [
      { dateAr: 'يناير 2024', dateEn: 'January 2024', titleAr: 'تخصيص الأرض وبدء التمويل', titleEn: 'Land Allocation & Funding', completed: true },
      { dateAr: 'مايو 24', dateEn: 'May 24', titleAr: 'أعمال البنى التحتية والتأسيس', titleEn: 'Infrastructure & Foundation Works', completed: true },
      { dateAr: 'ديسمبر 2024', dateEn: 'December 2024', titleAr: 'التشطيبات وتأثيث الفلل', titleEn: 'Internal Fitout & Furnishing', completed: false }
    ],
    mapCoordsUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5Tj9QCYE1_nSyCsnSx763K11d1KlBvAvgqEm2biPTMiHS171rnXGB03g4ONaD_Pnx0CHx5rJECQBIPoUnMva-Wmk5m92smg4F_DIuKN9olcUzgQ_5ezqh044fIefJEU2i8zEBg_epdYz3IN8Zpl3Ss1KH0F6ucWraFV4gIIn3ANQ1d9nFXD51z8WER51lIRhCzqPj4HvQqSwn_-1vPO-eAUSuiwro5oRWxfPoOHqQWkk4Q-xJtXMF1YQj1pyUBK7LgtgqqveiEn8',
  },
  {
    id: 'p4',
    titleAr: 'مستودعات اللوجستيات ١',
    titleEn: 'Logistics Park 1',
    locationAr: 'المنطقة الصناعية، الدمام',
    locationEn: 'Industrial Area, Dammam',
    expectedReturn: 15.5,
    termMonths: 48,
    targetSAR: 15000000,
    raisedSAR: 13800000, // 92%
    investorsCount: 210,
    status: 'active',
    statusLabelAr: 'تمويل مباشر',
    statusLabelEn: 'Direct Funding',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUJcHUpiRYyJeJS7R_7euwlAzMnhDVw1xTCzedl5zCCJ3Ri1FsBL8ZeT8Iah2TAFsB6bN1RQx9H0CTcsrL_y06kADaJEf1XbutUrBEFMealC8J7fLa0WzqAsIPgnEewnmOtHPmf3h7YREz37aLMGf9D3BciJT-SD8AOKNSVep3NMMKyxIQZORlJWcJ5jrR5ZqsOzqur0Drq1QgZmoG7D89kyRdzBUbHlmwIOtWBNsXHd0HqZrjLfUHK52hg1dxSNvZjgrVJ2vdOV4',
    imageAlt: 'Logistics Park',
    descriptionAr: 'مجمعات لوجستية ومستودعات تخزين متقدمة تدعم سلسلة الإمداد والنقل للمنطقة الشرقية مع عقود إيجار طويلة المدة.',
    descriptionEn: 'Advanced dry and cold storage warehouses supporting the regional supply chain in Eastern Province with reliable long leases.',
    areaSqm: 24000,
    floorsCount: 2,
    deliveryDateAr: 'الربع الرابع 2025',
    deliveryDateEn: 'Q4 2025',
    buildingGrade: 'Industrial Grade A',
    progress: {
      total: 92,
      breakdown: {
        foundation: 100,
        structure: 100,
        finishing: 75
      }
    },
    timeline: [
      { dateAr: 'نوفمبر 2023', dateEn: 'November 2023', titleAr: 'انطلاق الطرح اللوجستي', titleEn: 'Logistics Project Launch', completed: true },
      { dateAr: 'يناير 2024', dateEn: 'January 2024', titleAr: 'صب الخرسانات وتركيب الهيكل المعدني', titleEn: 'Hangar Metal Structure Complete', completed: true },
      { dateAr: 'مارس 2025', dateEn: 'March 2025', titleAr: 'تشغيل المستودعات الفني', titleEn: 'Operations Activation', completed: false }
    ],
    mapCoordsUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5Tj9QCYE1_nSyCsnSx763K11d1KlBvAvgqEm2biPTMiHS171rnXGB03g4ONaD_Pnx0CHx5rJECQBIPoUnMva-Wmk5m92smg4F_DIuKN9olcUzgQ_5ezqh044fIefJEU2i8zEBg_epdYz3IN8Zpl3Ss1KH0F6ucWraFV4gIIn3ANQ1d9nFXD51z8WER51lIRhCzqPj4HvQqSwn_-1vPO-eAUSuiwro5oRWxfPoOHqQWkk4Q-xJtXMF1YQj1pyUBK7LgtgqqveiEn8',
  },
  {
    id: 'p5',
    titleAr: 'بوليفارد التحلية التجاري',
    titleEn: 'Tahlia Avenue Boulevard',
    locationAr: 'شارع التحلية، جدة',
    locationEn: 'Tahlia Street, Jeddah',
    expectedReturn: 13.0,
    termMonths: 24,
    targetSAR: 20000000,
    raisedSAR: 6000000, // 30%
    investorsCount: 65,
    status: 'active',
    statusLabelAr: 'تمويل مباشر',
    statusLabelEn: 'Direct Funding',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl4y0SaXShjsmgf_gl27Ldl-h5auNNhYCx7fzzaZQUoWi8YZcDo6dYpD58HDViTgp2FdNtLcPfR_0SFd1BovOh-F9Id6cVCv6gqLrXjaO1Lmy6eJMhm5i2fG0e9QF6ZlzQH7Vh4k4187Y70heugJyERzsXOHsTFUGESlB5tIMfM4BQyYY577DhiZeUAATAVV6-n_Oivdetnem59JB0gye1pVbEJZuQCDV7e9y4L8XyzK1PdKn2jvhsgsyEsRbAuaH5qEcn4ii_TqA',
    imageAlt: 'Urban Retail Center',
    descriptionAr: 'وجهة تسوق خارجية عصرية على أشهر شوارع جدة التجارية، تضم مطاعم فاخرة ومحلات تجارية عالمية ومعارض تجارية.',
    descriptionEn: 'A luxury open-air retail destination on Jeddah’s most famous avenue, featuring high-end restaurants and premium brand stores.',
    areaSqm: 8900,
    floorsCount: 2,
    deliveryDateAr: 'الربع الثالث 2025',
    deliveryDateEn: 'Q3 2025',
    buildingGrade: 'Commercial Elite',
    progress: {
      total: 30,
      breakdown: {
        foundation: 100,
        structure: 45,
        finishing: 10
      }
    },
    timeline: [
      { dateAr: 'ديسمبر 2023', dateEn: 'December 2023', titleAr: 'توقيع عقود الامتياز والتجهيز', titleEn: 'Signing Brand Pre-Leases', completed: true },
      { dateAr: 'مارس 2024', dateEn: 'March 2024', titleAr: 'اكتمال صب الأساسات السفلية', titleEn: 'Foundations & Excavation Done', completed: true },
      { dateAr: 'أغسطس 2025', dateEn: 'August 2025', titleAr: 'بث افتتاح المحلات والبوليفارد', titleEn: 'Grand Opening & Handover', completed: false }
    ],
    mapCoordsUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5Tj9QCYE1_nSyCsnSx763K11d1KlBvAvgqEm2biPTMiHS171rnXGB03g4ONaD_Pnx0CHx5rJECQBIPoUnMva-Wmk5m92smg4F_DIuKN9olcUzgQ_5ezqh044fIefJEU2i8zEBg_epdYz3IN8Zpl3Ss1KH0F6ucWraFV4gIIn3ANQ1d9nFXD51z8WER51lIRhCzqPj4HvQqSwn_-1vPO-eAUSuiwro5oRWxfPoOHqQWkk4Q-xJtXMF1YQj1pyUBK7LgtgqqveiEn8',
  },
  {
    id: 'p6',
    titleAr: 'برج الكريستال السكني',
    titleEn: 'Crystal Residential Tower',
    locationAr: 'منطقة الأعمال الجديدة، القطاع ٤، الرياض',
    locationEn: 'New Business District, Sector 4, Riyadh',
    expectedReturn: 12.5,
    termMonths: 24,
    targetSAR: 12000000,
    raisedSAR: 8450000, // 70.4%
    investorsCount: 342,
    status: 'active',
    statusLabelAr: 'تمويل نشط',
    statusLabelEn: 'Active Funding',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQXeD1o7MZugh9L2D8pb-jZDNCFtO850Y6tqYKVe7FbvH30iPPz310tmwSjKQjab5-BcolaKfFW3B71uXpK8gFNh3tQK0GbtrfaEtb0mU5fep8WETQmj5uvgFOYxf3ruN5QlPMRWdo3Z96Cl92jTVpox1YNL-XndjJUVpZJ7gRkesgD-dffuCLncyLhWWq-wJkiz_qhXq7D31lKx-rI86-Ugh1rjmAcJ_YSDrB0BURLmcK7Oa9ydc90t-teWnDcKfvANFg-6VC1s0',
    imageAlt: 'Crystal Tower',
    descriptionAr: 'يقع برج الكريستال في قلب المنطقة المركزية الجديدة، ويمثل قمة الفخامة العصرية والاستدامة المعمارية. يضم المشروع ١٢٠ وحدة سكنية فاخرة، مع مرافق عالمية المستوى تشمل مركزاً للياقة البدنية، ومسبحاً بانورامياً، ومساحات عمل مشتركة. تم تصميم كل تفصيل ليعكس معايير الجودة المؤسسية التي تلتزم بها UrbanInvest.',
    descriptionEn: 'Located in the heart of Riyadh’s New Business District, Crystal Tower represents the pinnacle of premium residential lifestyle and architectural sustainability. Features 120 luxury residences with fitness clubs, panoramic pool and modern collaborative workspaces.',
    areaSqm: 4500,
    floorsCount: 35,
    deliveryDateAr: 'الربع الرابع 2025',
    deliveryDateEn: 'Q4 2025',
    buildingGrade: 'Grade A',
    progress: {
      total: 65,
      breakdown: {
        foundation: 100,
        structure: 82,
        finishing: 15
      }
    },
    timeline: [
      { dateAr: 'يناير 2024', dateEn: 'January 2024', titleAr: 'بدء طرح التمويل', titleEn: 'Funding Launch', completed: true },
      { dateAr: 'مارس 2024', dateEn: 'March 2024', titleAr: 'إغلاق التمويل وبدء البناء', titleEn: 'Funding Closed & Construction Start', completed: true },
      { dateAr: 'أكتوبر 2024', dateEn: 'October 2024', titleAr: 'اكتمال الهيكل الخرساني', titleEn: 'Concrete Structure Complete', completed: false },
      { dateAr: 'ديسمبر 2025', dateEn: 'December 2025', titleAr: 'تسليم الوحدات وتوزيع الأرباح', titleEn: 'Units Handover & Dividends', completed: false }
    ],
    mapCoordsUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5Tj9QCYE1_nSyCsnSx763K11d1KlBvAvgqEm2biPTMiHS171rnXGB03g4ONaD_Pnx0CHx5rJECQBIPoUnMva-Wmk5m92smg4F_DIuKN9olcUzgQ_5ezqh044fIefJEU2i8zEBg_epdYz3IN8Zpl3Ss1KH0F6ucWraFV4gIIn3ANQ1d9nFXD51z8WER51lIRhCzqPj4HvQqSwn_-1vPO-eAUSuiwro5oRWxfPoOHqQWkk4Q-xJtXMF1YQj1pyUBK7LgtgqqveiEn8',
    liveFeedUrl1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnSACXiS_fbc7QKTMkmDm-kJGBWZRF9-6UfJynDcKc72eLjRrHJM2jtbUgN_QPp0b0aJT8l3hK95K7GxE-i7zmVIOAQOpqqnJnC1pmf9MTOVlT20RsDyVMT2ME1X7lwOtYhhhwgMMpVsjDvNZmhMSehqcCqHenwgHKOk7ZYYAUaOGPSosZfiv7g5s7pWjwWecc0rtfXXnOZdNKPjSBq2haqz3VSlqVhwBBapDFXpQo0s3sxtWv2p6wwklBVXHtGMN8a1fab3ZNAbo',
    liveFeedLabel1Ar: 'كاميرا الكريستال ٠١ - الهيكل الرئيسي',
    liveFeedLabel1En: 'Camera Crystal 01 - Main Structure',
    liveFeedUrl2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkzypV_G91tkxaPRSxWIwzoSqahlrE1hBDoNanmCCtXNVolzan3045MwmhCadBp2i8TCoGjsjPnzHade1hguvyJU0VhCp4yI1CtgeX_TsL35oLxrVu6uEhn-LTHpbT62b9GYcPhC_b5i5EDnioHMBV-KF1PIV_7G2x_auEGfGyILmG7T7OkF4eUKrVdbojVGf8ssG-7SP4UJiKpx56WTE-XAe6WSuUjW1emx5g1bjN3fVBWL-HXarxd_o5KJ2cVpB-MlM82JHcJ_4',
    liveFeedLabel2Ar: 'كاميرا الكريستال ٠٢ - التشطيبات',
    liveFeedLabel2En: 'Camera Crystal 02 - internal Finishing'
  }
];

export const INITIAL_TRANSPARENCY_LOGS: TransparencyLog[] = [
  {
    id: 'l1',
    timeAr: 'اليوم، ١٠:٣٠ صباحاً',
    timeEn: 'Today, 10:30 AM',
    titleAr: 'صب بلاطة الطابق الثاني',
    titleEn: 'Pouring second floor slab',
    descriptionAr: 'تم الانتهاء بنجاح من صب الخرسانة المسلحة للطابق الثاني في البرج "أ" بمتابعة مكتب التدقيق الهندسي.',
    descriptionEn: 'Successfully completed the pouring of reinforced concrete for the 2nd floor of Block A, monitored by structural auditors.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCrOZXveudHFKnYl87QtpAuze96nMs8tOF7KDJmyNIbGak_BhzEP-taY2R-XLnf7YSCGmyL9zJftG2piSkwLxdZkyBXt6d-scmFxFLtpBk16LuRN3MF-HScokp96LRWbVd9o84Rww193lGGwrRJW4Dp8jao2KEUemj5gE8lo7PejBEkorhNnM13keVvxwfW7GPDLsU5Mz3lcCLCRI00T-qe3VCIq7uv1M84ewbg1t2IyVYPR2TE3tYQkAHQtf_dP-eFDVdUsgA171k',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCqHipn6kaw-_Nmzj1O8tO6pxetszO-P-bfdr1L58rShUoNgDvCjWYYEUlS8L9Qm3s1XouUP7Xx-fw7wTtn2GKkGnV4sMMGrmP4ejZcG_TUZfx98rV2XKbKaiVsCX069junZHDZ8WGwBo8j8QxotcXawjF4m_3y2087hL_Z5bcg08Ooy9Ldr1sBAt0Z0j9PhSDJBYs8bCNoJQmiOcEIq11tx7Wpszl52Oyiif3VZ14hB5M07BXWqDtO9uuzu7sLZa9Hx382hIQ_9wI'
    ],
    type: 'check'
  },
  {
    id: 'l2',
    timeAr: 'أمس، ٠٤:١٥ مساءً',
    timeEn: 'Yesterday, 04:15 PM',
    titleAr: 'تركيب المصاعد الذكية',
    titleEn: 'Installing Smart Elevators',
    descriptionAr: 'وصول وتركيب أول دفعة من المصاعد الذكية من طراز شنايدر الألمانية الصنع لتجربتها وحمايتها.',
    descriptionEn: 'Arrival and installation of the first batch of German intelligent Schneider elevators, configured for eco-operation.',
    type: 'check'
  },
  {
    id: 'l3',
    timeAr: '١٢ أكتوبر ٢٠٢٣',
    timeEn: '12 October 2023',
    titleAr: 'اكتمال أعمال الأساسات الإنشائية',
    titleEn: 'Structural Foundation Work Completed',
    descriptionAr: 'تم اجتياز فحص السلامة الإنشائية واختبار التربة والأساسات بنجاح تام واعتماده رسمياً.',
    descriptionEn: 'Successfully passed structural security checks, soil compaction, and core foundation load tests, approved by local engineering auditors.',
    type: 'check'
  },
  {
    id: 'l4',
    timeAr: 'متوقع في ٢٥ أكتوبر',
    timeEn: 'Expected on 25 October',
    titleAr: 'بدء تركيب الواجهة الزجاجية الجدارية',
    titleEn: 'Start Curtain Glass Facade Installation',
    descriptionAr: 'المواد والزجاج الموفر للطاقة حالياً في مرحلة التخليص الجمركي بميناء الملك عبدالله تمهيداً للشحن والنقل للموقع.',
    descriptionEn: 'Energy-save insulated solar glass panels are currently in clearing pipeline at King Abdullah Port, ready to truck-ship to Riyadh.',
    type: 'hourglass'
  }
];

export const INITIAL_PAYOUTS: PayoutHistory[] = [
  {
    id: 'py1',
    dateAr: '١ سبتمبر ٢٠٢٣',
    dateEn: '1 September 2023',
    projectTitleAr: 'أبراج سكاي لاين - دبي',
    projectTitleEn: 'Skyline Towers - Dubai',
    typeAr: 'عوائد إيجارية',
    typeEn: 'Rental Income',
    amountSAR: 3187, // Equivalent to $850.00 using 3.75 SAR/USD
    statusAr: 'تم الإيداع',
    statusEn: 'Deposited'
  },
  {
    id: 'py2',
    dateAr: '١٥ أغسطس ٢٠٢٣',
    dateEn: '15 August 2023',
    projectTitleAr: 'مركز الابتكار التجاري',
    projectTitleEn: 'Innovation Business Hub',
    typeAr: 'توزيع أرباح ومكافآت',
    typeEn: 'Dividend Yield',
    amountSAR: 4650, // Equivalent to $1,240.00
    statusAr: 'تم الإيداع',
    statusEn: 'Deposited'
  },
  {
    id: 'py3',
    dateAr: '١ أغسطس ٢٠٢٣',
    dateEn: '1 August 2023',
    projectTitleAr: 'أبراج سكاي لاين - دبي',
    projectTitleEn: 'Skyline Towers - Dubai',
    typeAr: 'عوائد إيجارية',
    typeEn: 'Rental Income',
    amountSAR: 3187,
    statusAr: 'تم الإيداع',
    statusEn: 'Deposited'
  }
];
