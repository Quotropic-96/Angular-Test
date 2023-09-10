import { TestBed } from '@angular/core/testing';
import { Course } from 'src/app/models/course.interface';
import { Term } from 'src/app/models/term.interface';
import { Session } from 'src/app/models/session.interface';
import { courses } from 'src/app/data/courses';
import { terms } from 'src/app/data/terms';
import { sessions } from 'src/app/data/sessions';

import { ContentService } from './content.service';

describe('ContentService', () => {
  let contentService: ContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    contentService = TestBed.inject(ContentService);
  });

  it('should be created', () => {
    expect(contentService).toBeTruthy();
  });

  it('should return all courses', () => {
    const allCourses: Course[] = contentService.getAllCourses();

    expect(allCourses).toEqual(courses);
  });

  it('should return terms for a given course', () => {
    const courseId = '3i';
    const termsByCourse: Term[] = contentService.getTermsByCourse(courseId);
    const expectedTerms: Term[] = terms.filter(term => term.courseId === courseId);
    
    expect(termsByCourse).toEqual(expectedTerms);
  });

  it('should return sessions for a given course and term', () => {
    const courseId = '4i';
    const termNumber = 1;
    const sessionsByCourseAndTerm: Session[] = contentService.getSessionsByCourseAndTerm(courseId, termNumber);
    const expectedSessions: Session[] = sessions.filter(session => session.courseId === courseId && session.term === termNumber);
    
    expect(sessionsByCourseAndTerm).toEqual(expectedSessions);
  });

  it('should return a session by ID', () => {
    const sessionId = '3i-1-2';
    const sessionById: Session = contentService.getSessionById(sessionId);
    const expectedSession: Session = sessions.filter(session => session._id === sessionId)[0];

    expect(sessionById).toEqual(expectedSession);
  });
});
