import { Injectable } from '@angular/core';
import { user } from 'src/app/data/user';
// import { terms } from 'src/app/data/terms';
// import { sessions } from 'src/app/data/sessions';
// import { Term } from 'src/app/models/term.interface';
// import { Session } from 'src/app/models/session.interface';
import { CourseId } from 'src/app/shared/courseId';
import { UserTerm } from 'src/app/models/userTerm';
import { Session } from 'src/app/models/session.interface';
import { UserSession } from 'src/app/models/userSession.interface';
import { ContentService } from '../content-service/content.service';

@Injectable({
  providedIn: 'root',
})
export class UserProgressService {
  // private terms: Term[] = terms;
  // private sessions: Session[] = sessions;
  private user = user;
  private termProgress: UserTerm[] = [
    {
      courseId: '3i',
      termNumber: 1,
      totalSessions: 0,
      completedSessions: 0,
      isCompleted: false,
    },
    {
      courseId: '3i',
      termNumber: 2,
      totalSessions: 0,
      completedSessions: 0,
      isCompleted: false,
    },
    {
      courseId: '3i',
      termNumber: 3,
      totalSessions: 0,
      completedSessions: 0,
      isCompleted: false,
    },
  ];

  constructor(private contentService: ContentService) {}

  getTermProgress(courseId: CourseId): UserTerm[] {
    return this.termProgress.map((term, idx) => {
      let sessions = this.user.sessionProgress.filter(
        (session) => session.courseId === courseId && session.term === idx + 1
      );
      term.courseId = courseId;
      term.totalSessions = sessions.length;
      term.completedSessions = sessions.filter(
        (session) => session.completed
      ).length;
      term.isCompleted = term.totalSessions === term.completedSessions;
      return term;
    });
  }

  getSingleTermProgress(courseId: CourseId, termNumber: number): UserTerm {
    const selectedTerm = this.getTermProgress(courseId).filter(
      (term) => term.termNumber === termNumber
    );
    if (selectedTerm.length != 0) {
      return selectedTerm[0];
    } else {
      //Throw error
    }
    return selectedTerm[0];
  }

  getSessionsProgress(courseId: CourseId, termNumber: number): UserSession[] {
    const filtteredSessions = this.user.sessionProgress.filter(
      (session) => session.courseId === courseId && session.term === termNumber
    );
    return filtteredSessions.map((session, idx) => {
      let userSession: UserSession = {
        sessionNumber: session.sessionNumber,
        sessionTitle: this.contentService.getSessionById(session.sessionId).title,
        isDone: session.completed,
        isNext: !session.completed && (idx === 0 ||filtteredSessions[idx - 1].completed),
      };
      return userSession;
    });
  }

  getNextSession() : Session | undefined {
    const storedSession = localStorage.getItem('nextSession');
    if (storedSession) {
      return JSON.parse(storedSession);
    } else {
      const incompleteSession = user.sessionProgress.find((session) => !session.completed);
      if (incompleteSession) {
        return this.contentService.getSessionById(incompleteSession.sessionId);
      } else {
        return undefined;
      }
    }
  }
}
