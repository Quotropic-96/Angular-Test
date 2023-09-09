import { CourseId } from "../shared/courseId";

export interface Term {
  _id: string,
  courseId: CourseId,
  termNumber: number,
  totalSessions: number,
  sessions: string[]
}