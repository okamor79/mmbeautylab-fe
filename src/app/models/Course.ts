export interface Course {
  id?: number;
  uniqueCode: string;
  courseName: string;
  description: string;
  fullDescription: string;
  startDate: any;
  endDate: any;
  dayAccess: number;
  courseUrl: string;
  urlCoursePreview: string;
  price: number;
  avatar?: File;
  discount: number;
  status: string;
}
