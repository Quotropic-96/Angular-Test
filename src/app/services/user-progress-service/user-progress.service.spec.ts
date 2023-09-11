import { TestBed } from '@angular/core/testing';

import { UserProgressService } from './user-progress.service';
import { ContentService } from '../content-service/content.service';
import { user } from 'src/app/data/user';
import { defaultUserTerm } from 'src/app/models/userTerm';
import { CourseId } from 'src/app/shared/courseId';
import { Session } from 'src/app/models/session.interface';

describe('UserProgressService', () => {
  let userProgressService: UserProgressService;
  let contentService: ContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserProgressService, ContentService],
    });

    userProgressService = TestBed.inject(UserProgressService);
    contentService = TestBed.inject(ContentService);
  });

  it('should be created', () => {
    expect(userProgressService).toBeTruthy();
  });

  it('should initialize term progress with default values', () => {
    const numberOfTerms = 3;

    expect(userProgressService['termProgress'].length).toEqual(numberOfTerms);

    userProgressService['termProgress'].forEach((term, idx) => {
      expect(term).toEqual({ ...defaultUserTerm, termNumber: idx + 1 });
    });
  });

  it('should get term progress by course', () => {
    const courseId: CourseId = '4i';

    user.sessionProgress = [
      {
        sessionId: 'session',
        courseId: '4i',
        term: 1,
        sessionNumber: 1,
        completed: true,
      },
      {
        sessionId: 'session',
        courseId: '4i',
        term: 1,
        sessionNumber: 2,
        completed: true,
      },
      {
        sessionId: 'session',
        courseId: '4i',
        term: 2,
        sessionNumber: 1,
        completed: true,
      },
      {
        sessionId: 'session',
        courseId: '4i',
        term: 2,
        sessionNumber: 2,
        completed: true,
      },
      {
        sessionId: 'session',
        courseId: '4i',
        term: 2,
        sessionNumber: 3,
        completed: false,
      },
      {
        sessionId: 'session',
        courseId: '4i',
        term: 3,
        sessionNumber: 1,
        completed: false,
      },
      {
        sessionId: 'session',
        courseId: '4i',
        term: 3,
        sessionNumber: 2,
        completed: false,
      },
    ];

    const termProgress = userProgressService.getTermProgressByCourse(courseId);

    expect(termProgress).toEqual([
      {
        courseId: '4i',
        termNumber: 1,
        totalSessions: 2,
        completedSessions: 2,
        isCompleted: true,
      },
      {
        courseId: '4i',
        termNumber: 2,
        totalSessions: 3,
        completedSessions: 2,
        isCompleted: false,
      },
      {
        courseId: '4i',
        termNumber: 3,
        totalSessions: 2,
        completedSessions: 0,
        isCompleted: false,
      },
    ]);
  });

  it('should get single term progress', () => {
    const courseId: CourseId = '4i';
    const termNumber = 2;

    user.sessionProgress = [
      {
        sessionId: 'session',
        courseId: '4i',
        term: 1,
        sessionNumber: 1,
        completed: true,
      },
      {
        sessionId: 'session',
        courseId: '4i',
        term: 1,
        sessionNumber: 2,
        completed: true,
      },
      {
        sessionId: 'session',
        courseId: '4i',
        term: 2,
        sessionNumber: 1,
        completed: true,
      },
      {
        sessionId: 'session',
        courseId: '4i',
        term: 2,
        sessionNumber: 2,
        completed: false,
      },
      {
        sessionId: 'session',
        courseId: '4i',
        term: 2,
        sessionNumber: 3,
        completed: false,
      },
      {
        sessionId: 'session',
        courseId: '4i',
        term: 3,
        sessionNumber: 1,
        completed: false,
      },
      {
        sessionId: 'session',
        courseId: '4i',
        term: 3,
        sessionNumber: 2,
        completed: false,
      },
    ];

    const singleTermProgress = userProgressService.getSingleTermProgress(
      courseId,
      termNumber
    );

    expect(singleTermProgress).toEqual({
      courseId: '4i',
      termNumber: 2,
      totalSessions: 3,
      completedSessions: 1,
      isCompleted: false,
    });
  });

  it('should get sessions progress by course and term', () => {
    const courseId: CourseId = '4i';
    const termNumber = 2;

    user.sessionProgress = [
      {
        sessionId: '4i-1-1',
        courseId: '4i',
        term: 1,
        sessionNumber: 1,
        completed: true,
      },
      {
        sessionId: '4i-1-2',
        courseId: '4i',
        term: 1,
        sessionNumber: 2,
        completed: true,
      },
      {
        sessionId: '4i-2-1',
        courseId: '4i',
        term: 2,
        sessionNumber: 1,
        completed: true,
      },
      {
        sessionId: '4i-2-2',
        courseId: '4i',
        term: 2,
        sessionNumber: 2,
        completed: false,
      },
      {
        sessionId: '4i-2-3',
        courseId: '4i',
        term: 2,
        sessionNumber: 3,
        completed: false,
      },
      {
        sessionId: '4i-3-1',
        courseId: '4i',
        term: 3,
        sessionNumber: 1,
        completed: false,
      },
      {
        sessionId: '4i-3-2',
        courseId: '4i',
        term: 3,
        sessionNumber: 2,
        completed: false,
      },
    ];

    const sessionsProgress =
      userProgressService.getSessionsProgressByCourseAndTerm(
        courseId,
        termNumber
      );

    expect(sessionsProgress).toEqual([
      {
        sessionId: '4i-2-1',
        sessionNumber: 1,
        sessionTitle: 'Num. 1 del trimestre 2 del curso 4º de Infantil',
        isDone: true,
        isNext: false,
      },
      {
        sessionId: '4i-2-2',
        sessionNumber: 2,
        sessionTitle: 'Num. 2 del trimestre 2 del curso 4º de Infantil',
        isDone: false,
        isNext: true,
      },
      {
        sessionId: '4i-2-3',
        sessionNumber: 3,
        sessionTitle: 'Num. 3 del trimestre 2 del curso 4º de Infantil',
        isDone: false,
        isNext: false,
      },
    ]);
  });

  it('should get the next session', () => {
    user.sessionProgress = [
      {
        sessionId: '4i-1-1',
        courseId: '4i',
        term: 1,
        sessionNumber: 1,
        completed: true,
      },
      {
        sessionId: '4i-1-2',
        courseId: '4i',
        term: 1,
        sessionNumber: 2,
        completed: true,
      },
      {
        sessionId: '4i-2-1',
        courseId: '4i',
        term: 2,
        sessionNumber: 1,
        completed: true,
      },
      {
        sessionId: '4i-2-2',
        courseId: '4i',
        term: 2,
        sessionNumber: 2,
        completed: true,
      },
      {
        sessionId: '4i-2-3',
        courseId: '4i',
        term: 2,
        sessionNumber: 3,
        completed: true,
      },
      {
        sessionId: '4i-3-1',
        courseId: '4i',
        term: 3,
        sessionNumber: 1,
        completed: false,
      },
      {
        sessionId: '4i-3-2',
        courseId: '4i',
        term: 3,
        sessionNumber: 2,
        completed: false,
      },
    ];

    const storedNextSession: Session = {
      courseId: '4i',
      sessionNumber: 1,
      term: 3,
      title: 'Num. 1 del trimestre 3 del curso 4º de Infantil',
      _id: '4i-3-1',
    };

    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify(storedNextSession)
    );

    const nextSession = userProgressService.getNextSession();

    expect(nextSession).toEqual(storedNextSession);
  });
});
