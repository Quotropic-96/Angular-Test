import { Component } from '@angular/core';
import { UserTerm } from 'src/app/models/userTerm';
import { Session } from 'src/app/models/session.interface';
import { UserProgressService } from 'src/app/services/user-progress-service/user-progress.service';
import { SettingsService } from 'src/app/services/settings-service/settings.service';
import { CourseId } from 'src/app/shared/courseId';
import { MenuService } from 'src/app/services/menu-service/menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  nextSession!: Session | null;
  terms!: UserTerm[];
  currentCourse!: CourseId;
  isBlur: boolean = false;

  settingsSubscription!: Subscription;
  menuSubscription!: Subscription;

  constructor(
    private userProgressService: UserProgressService,
    private settingsService: SettingsService,
    private menuService: MenuService
  ) {}

  ngOnInit() : void {
    this.settingsSubscription = this.settingsService.settings$.subscribe(() => {
      this.getCurrentCourse();
      this.getTermProgress(this.currentCourse);
    });

    this.menuSubscription = this.menuService.isBlurActive$.subscribe((isBlurActive) => {
      this.isBlur = isBlurActive;
    });

    this.nextSession = this.userProgressService.getNextSession();
  }

  ngOnDestroy() : void {
    this.settingsSubscription.unsubscribe();
    this.menuSubscription.unsubscribe();
  }

  getCurrentCourse() : void {
    this.currentCourse = this.settingsService.getCourse();
  }

  getTermProgress(courseId: CourseId) : void {
    this.terms = this.userProgressService.getTermProgressByCourse(courseId);
  }
}
