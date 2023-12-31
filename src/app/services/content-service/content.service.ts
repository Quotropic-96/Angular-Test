import { Injectable } from '@angular/core';
import { courses } from 'src/app/data/courses';
import { terms } from 'src/app/data/terms';
import { sessions } from 'src/app/data/sessions';
import { Course } from 'src/app/models/course.interface';
import { Term } from 'src/app/models/term.interface';
import { Session } from 'src/app/models/session.interface';
import { CourseId } from 'src/app/shared/courseId';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private courses: Course[] = courses;
  private terms: Term[] = terms;
  private sessions: Session[] = sessions;

  constructor() { }

  getAllCourses() : Course[] {
    return this.courses;
  }

  getAllSessions() : Session[] {
    return this.sessions;
  }

  getTermsByCourse(courseId: string) : Term[] {
    return this.terms.filter(term => term.courseId === courseId);
  }

  getSessionsByCourseAndTerm(courseId: CourseId, termNumber: number) : Session[] {
    return this.sessions.filter(session => session.courseId === courseId && session.term === termNumber);
  }

  getSessionById(sessionId: string) : Session {
    return this.sessions.filter(session => session._id === sessionId)[0];
  }
}
