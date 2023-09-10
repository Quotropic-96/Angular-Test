import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserTerm, defaultUserTerm } from 'src/app/models/userTerm';
import { UserProgressService } from 'src/app/services/user-progress-service/user-progress.service';
import { SettingsService } from 'src/app/services/settings-service/settings.service';
import { CourseId } from 'src/app/shared/courseId';
import { UserSession, defaultUserSession } from 'src/app/models/userSession.interface';
import { Subscription } from 'rxjs';
import { MenuService } from 'src/app/services/menu-service/menu.service';

@Component({
  selector: 'app-term-detail',
  templateUrl: './term-detail.component.html',
  styleUrls: ['./term-detail.component.scss'],
})
export class TermDetailComponent {
  courseId: CourseId = '3i';
  termId: number = 0;
  term!: UserTerm;
  sessions: UserSession[] = [];

  isError: boolean = false;
  errorMessage: string = '';

  private routeParamsSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private settingsService: SettingsService,
    private userProgressService: UserProgressService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.routeParamsSubscription = this.route.params.subscribe((params) => {
      this.courseId = this.settingsService.getCourse();
      this.termId = parseInt(params['id']);
      this.term = this.getSingleTermProgress(this.courseId, this.termId);
      this.sessions = this.getSessionsProgressByCourseAndTerm(this.courseId, this.termId);
    });
  }

  getSingleTermProgress(courseId: CourseId, termId: number): UserTerm {
    try {
      return this.userProgressService.getSingleTermProgress(courseId, termId);
    } catch (error) {
      this.isError = true;
      this.errorMessage = `Could not fetch progress for term ${termId}. ${error}`;
      return defaultUserTerm;
    }
  }

  getSessionsProgressByCourseAndTerm(courseId: CourseId, termId: number) : UserSession[]{
    try {
      return this.userProgressService.getSessionsProgressByCourseAndTerm(courseId, termId);
    } catch (error) {
      this.isError = true;
      this.errorMessage = `Could not fetch sessions for term ${termId}. ${error}`;
      return [defaultUserSession];
    }
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe();
  }

  goBack(): void {
    this.location.back();
  }

  isBlurActive() {
    return this.menuService.isBlurActive$;
  }
}
