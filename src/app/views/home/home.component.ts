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
  randomSession!: Session;
  terms!: UserTerm[];
  currentCourse!: CourseId;

  isError: boolean = false;
  errorMessage: string = '';

  private settingsSubscription!: Subscription;

  constructor(
    private userProgressService: UserProgressService,
    private settingsService: SettingsService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.settingsSubscription = this.settingsService.settings$.subscribe(() => {
      this.getCurrentCourse();
      this.getTermProgress(this.currentCourse);
    });

    this.nextSession = this.userProgressService.getNextSession();
    this.randomSession = this.userProgressService.getRandomSession();
  }

  ngOnDestroy(): void {
    this.settingsSubscription.unsubscribe();
  }

  getCurrentCourse(): void {
    this.currentCourse = this.settingsService.getCourse();
  }

  getTermProgress(courseId: CourseId): void {
    try {
      this.terms = this.userProgressService.getTermProgressByCourse(courseId);
      if (this.terms.length === 0) {
        this.isError = true;
        this.errorMessage = `No data found for course ${courseId}`;
      }
    } catch (error) {
      this.isError = true;
      this.errorMessage = 'Could not load your progress';
    }
  }

  isBlurActive() {
    return this.menuService.isBlurActive$;
  }
}
