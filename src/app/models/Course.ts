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
  price: number;
  avatar?: File;
  discount: number;
  status: string;
}
