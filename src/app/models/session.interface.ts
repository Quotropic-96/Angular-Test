import { CourseId } from "../shared/courseId";

export interface Session {
 _id: string,
 courseId: CourseId,
 term: number,
 sessionNumber: number,
 title: string 
}