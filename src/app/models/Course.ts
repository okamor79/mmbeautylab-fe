export interface Course {
  id?: number;
  uniqCode: string;
  name: string;
  description: string;
  fullDescript: string;
  startDate: any;
  finishDate: any;
  daysCountAccess: number;
  courseUrl: string;
  previewUrl: string;
  avatarUrl: string;
  price: number;
  discount: number;
  status: string;
}
