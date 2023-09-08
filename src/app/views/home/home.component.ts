import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  currentTerm = '2º Trimestre'
  currentSession = '25, Ordinales, Fraccionales y Decimales';

  terms = [
    {
      number: 1,
      totalSessions: 50,
      completedSessions: 50,
      isCompleted: true
    },
    {
      number: 2,
      totalSessions: 50,
      completedSessions: 30,
      isCompleted: false
    },
    {
      number: 3,
      totalSessions: 50,
      completedSessions: 0,
      isCompleted: false
    }
  ];
}
