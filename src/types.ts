export interface Project {
  id: string;
  titleAr: string;
  titleEn: string;
  locationAr: string;
  locationEn: string;
  expectedReturn: number; // e.g. 12.5 for 12.5%
  termMonths: number;
  targetSAR: number;
  raisedSAR: number;
  investorsCount: number;
  status: 'active' | 'upcoming' | 'completed';
  statusLabelAr: string;
  statusLabelEn: string;
  imageUrl: string;
  imageAlt: string;
  descriptionAr: string;
  descriptionEn: string;
  areaSqm: number;
  floorsCount: number;
  deliveryDateAr: string;
  deliveryDateEn: string;
  buildingGrade: string;
  minInvestmentSAR?: number;
  progress: {
    total: number;
    breakdown: {
      foundation: number;
      structure: number;
      finishing: number;
    };
  };
  timeline: {
    dateAr: string;
    dateEn: string;
    titleAr: string;
    titleEn: string;
    completed: boolean;
  }[];
  mapCoordsUrl?: string;
  liveFeedUrl1?: string;
  liveFeedUrl2?: string;
  liveFeedLabel1Ar?: string;
  liveFeedLabel1En?: string;
  liveFeedLabel2Ar?: string;
  liveFeedLabel2En?: string;
}

export interface Investment {
  id: string;
  projectId: string;
  amountSAR: number;
  investedDate: string;
  actualReturn: number; // e.g. 8.5
  statusAr: string;
  statusEn: string;
}

export interface PayoutHistory {
  id: string;
  dateAr: string;
  dateEn: string;
  projectTitleAr: string;
  projectTitleEn: string;
  typeAr: string;
  typeEn: string;
  amountSAR: number;
  statusAr: string;
  statusEn: string;
}

export interface TransparencyLog {
  id: string;
  timeAr: string;
  timeEn: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  images?: string[];
  type: 'check' | 'hourglass';
  category?: 'technical' | 'financial' | 'legal';
}
