import { Component } from '@angular/core';
import { UserTerm } from 'src/app/models/userTerm';
import { UserProgressService } from 'src/app/services/user-progress-service/user-progress.service';
import { CourseId } from 'src/app/shared/courseId';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  currentTerm = '2º Trimestre'
  currentSession = '25, Ordinales, Fraccionales y Decimales';
  terms!: UserTerm[];

  constructor(private userProgressService: UserProgressService) {}

  ngOnInit() {
    this.getTermProgress('4i');
  }

  getTermProgress (courseId: CourseId) {
    this.terms = this.userProgressService.getTermProgress(courseId);
  }
  
}
