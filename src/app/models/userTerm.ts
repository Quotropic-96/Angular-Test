import { CourseId } from '../shared/courseId';

export interface UserTerm {
  courseId: CourseId;
  termNumber: number;
  totalSessions: number;
  completedSessions: number;
  isCompleted: boolean;
}

export const defaultUserTerm: UserTerm = {
  courseId: '3i',
  termNumber: 0,
  totalSessions: 0,
  completedSessions: 0,
  isCompleted: false,
};
