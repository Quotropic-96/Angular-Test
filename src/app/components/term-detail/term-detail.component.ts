import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-term-detail',
  templateUrl: './term-detail.component.html',
  styleUrls: ['./term-detail.component.scss'],
})
export class TermDetailComponent implements OnInit {
  termId: string = '';
  termNumber: number = 0;
  completedSessions: number = 0;
  totalSessions: number = 0;
  sessions = [
    {
      sessionNumber: 22,
      sessionTitle: 'Ordinales',
      isDone: true,
      isNext: false
    },
    {
      sessionNumber: 23,
      sessionTitle: 'Ordinales y fracciones',
      isDone: true,
      isNext: false
    },
    {
      sessionNumber: 24,
      sessionTitle: 'Fracciones y decimales',
      isDone: true,
      isNext: false
    },
    {
      sessionNumber: 25,
      sessionTitle: 'Ordinales, fracciones y decimales',
      isDone: false,
      isNext: true
    },
    {
      sessionNumber: 26,
      sessionTitle: 'Ordinales, fracciones, decimales y geometría',
      isDone: false,
      isNext: false
    },
    {
      sessionNumber: 27,
      sessionTitle: 'Geometría y fracciones',
      isDone: false,
      isNext: false
    },
    {
      sessionNumber: 28,
      sessionTitle: 'Fracciones, decimales y gemoetría',
      isDone: false,
      isNext: false
    },
    {
      sessionNumber: 29,
      sessionTitle: 'Ordinales, Fracciones, Decimales, Gemoetría, Numeros Enteros',
      isDone: false,
      isNext: false
    }
  ]

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.termId = params['id'];
      // Fetch term info from db
      this.termNumber = parseInt(this.termId);
      this.completedSessions = 20;
      this.totalSessions = 50;
    });
  }
}
