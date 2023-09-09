import { CourseId } from "../shared/courseId"

export interface UserTerm {
  courseId: CourseId,
  termNumber: number,
  totalSessions: number,
  completedSessions: number,
  isCompleted: boolean
}