import { Component } from '@angular/core';
import { UserTerm } from 'src/app/models/userTerm';
import { Session } from 'src/app/models/session.interface';
import { UserProgressService } from 'src/app/services/user-progress-service/user-progress.service';
import { SettingsService } from 'src/app/services/settings-service/settings.service';
import { CourseId } from 'src/app/shared/courseId';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  nextSession!: Session | null;
  terms!: UserTerm[];
  currentCourse!: CourseId;

  constructor(
    private userProgressService: UserProgressService,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.settingsService.settings$.subscribe(() => {
      this.getCurrentCourse();
      this.getTermProgress(this.currentCourse);
    });

    this.nextSession = this.userProgressService.getNextSession();
  }

  getCurrentCourse() {
    this.currentCourse = this.settingsService.getCourse();
  }

  getTermProgress(courseId: CourseId) {
    this.terms = this.userProgressService.getTermProgressByCourse(courseId);
  }
}
