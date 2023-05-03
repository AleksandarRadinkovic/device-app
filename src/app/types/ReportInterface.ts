export interface ReportInterface {
  id: number;
  from: string;
  until: string;
  issi: string;
  format: string;
  creationDate: string;
  status: string;
}

export interface ReportPramsInterface {
  from: string;
  until: string;
}
