import { Injectable } from '@angular/core';
import { user } from 'src/app/data/user';
import { terms } from 'src/app/data/terms';
import { sessions } from 'src/app/data/sessions';
import { Term } from 'src/app/models/term.interface';
import { Session } from 'src/app/models/session.interface';
import { CourseId } from 'src/app/shared/courseId';
import { UserTerm } from 'src/app/models/userTerm';

@Injectable({
  providedIn: 'root',
})
export class UserProgressService {
  private terms: Term[] = terms;
  private sessions: Session[] = sessions;
  private user = user;
  private termProgressDefault: UserTerm[] = [
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
    }
  ];

  constructor() {}

  getTermProgress(courseId: CourseId): UserTerm[] {
    const termProgress: UserTerm[] = JSON.parse(JSON.stringify(this.termProgressDefault));
    this.user.sessionProgress
      .filter((session) => session.courseId === courseId)
      .forEach((filteredSession) => {
        termProgress[filteredSession.term - 1].totalSessions += 1;
        if (filteredSession.completed) {
          termProgress[filteredSession.term - 1].completedSessions += 1;
        }
      });
    return termProgress.map((term) => {
      term.isCompleted = term.totalSessions === term.completedSessions;
      return term;
    });
  }
}
