import { Component } from '@angular/core';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.scss']
})
export class TarjetasComponent {
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
