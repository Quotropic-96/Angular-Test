import { Injectable } from '@angular/core';
import { user } from 'src/app/data/user';
import { CourseId } from 'src/app/shared/courseId';
import { UserTerm, defaultUserTerm } from 'src/app/models/userTerm';
import { Session } from 'src/app/models/session.interface';
import { UserSession } from 'src/app/models/userSession.interface';
import { ContentService } from '../content-service/content.service';

@Injectable({
  providedIn: 'root',
})
export class UserProgressService {
  private user = user;
  private termProgress: UserTerm[] = [];

  constructor(private contentService: ContentService) {
    this.initializeTermProgress();
  }

  private initializeTermProgress() {
    const numberOfTerms = 3;

    for (let termNumber = 1; termNumber <= numberOfTerms; termNumber++) {
      this.termProgress.push({...defaultUserTerm, termNumber});
    }
  }

  getTermProgressByCourse(courseId: CourseId): UserTerm[] {
    try {
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
    } catch (error) {
      throw new Error(`Unable to fetch terms progress fro course ${courseId}`);
    }
  }

  getSingleTermProgress(courseId: CourseId, termNumber: number): UserTerm {
    try {
      return this.getTermProgressByCourse(courseId).filter(
        (term) => term.termNumber === termNumber
      )[0];
    } catch (error) {
      throw new Error(`Unable to find the term: ${termNumber} from course: ${courseId}`);
    }
  }

  getSessionsProgressByCourseAndTerm(courseId: CourseId,termNumber: number): UserSession[] {
    try {
      const filteredSessions = this.user.sessionProgress.filter(
        (session) => session.courseId === courseId && session.term === termNumber
      );
      return filteredSessions.map((session, idx) => {
        let userSession: UserSession = {
          sessionId: this.contentService.getSessionById(session.sessionId)._id,
          sessionNumber: session.sessionNumber,
          sessionTitle: this.contentService.getSessionById(session.sessionId).title,
          isDone: session.completed,
          isNext:
            !session.completed &&
            (idx === 0 || filteredSessions[idx - 1].completed),
        };
        return userSession;
      });
    } catch (error) {
      throw new Error(
        `Unable to find session progress for course: ${courseId} and term: ${termNumber}`
      );
    }
  }

  getNextSession(): Session | null {
    const storedSession = localStorage.getItem('nextSession');

    if (storedSession) {
      return JSON.parse(storedSession);
    }

    const incompleteSession = user.sessionProgress.find(
      (session) => !session.completed
    );
    if (incompleteSession) {
      const nextSession = this.contentService.getSessionById(
        incompleteSession.sessionId
      );
      this.saveNextSession(nextSession);
      return nextSession;
    }

    return null;
  }

  // Should be called when a session is finished for the first time
  saveNextSession(nextSession: Session): void {
    localStorage.setItem('nextSession', JSON.stringify(nextSession));
  }

  getRandomSession() : Session {
    const sessions = this.contentService.getAllSessions();
    return sessions[Math.floor(Math.random() * sessions.length)];
  }

  getAfterNextSession(): Session | null {
    const nextSession = this.getNextSession();
    if (!nextSession) return null;
    
    const termProgress = this.getSingleTermProgress(nextSession.courseId, nextSession.term);
    let afterNextSessionId: string;

    if (nextSession.sessionNumber + 1 <= termProgress.totalSessions) {
      afterNextSessionId = nextSession.courseId + '-' + nextSession.term.toString() + '-' + (nextSession.sessionNumber + 1).toString();
    } else if (nextSession.term < 3) {
      afterNextSessionId = nextSession.courseId + '-' + (nextSession.term + 1).toString() + '-1';
    } else if (nextSession.courseId !== '5i') {
      afterNextSessionId = (parseInt(nextSession.courseId[0]) + 1).toString() + '-1-1';
    } else {
      return null;
    }
    return this.contentService.getSessionById(afterNextSessionId);
  }
}
