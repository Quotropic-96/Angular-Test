import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserTerm } from 'src/app/models/userTerm';
import { UserProgressService } from 'src/app/services/user-progress-service/user-progress.service';
import { SettingsService } from 'src/app/services/settings-service/settings.service';
import { CourseId } from 'src/app/shared/courseId';
import { UserSession } from 'src/app/models/userSession.interface';
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
      this.term = this.userProgressService.getSingleTermProgress(this.courseId, this.termId);
      this.sessions = this.userProgressService.getSessionsProgressByCourseAndTerm(this.courseId, this.termId);
    });
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
