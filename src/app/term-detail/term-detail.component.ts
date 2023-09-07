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
      sessionState: 'Done',
      isNext: false
    },
    {
      sessionNumber: 23,
      sessionTitle: 'Ordinales y fracciones',
      sessionState: 'Done',
      isNext: false
    },
    {
      sessionNumber: 24,
      sessionTitle: 'Fracciones y decimales',
      sessionState: 'Done',
      isNext: false
    },
    {
      sessionNumber: 25,
      sessionTitle: 'Ordinales, fracciones y decimales',
      sessionState: 'Pending',
      isNext: true
    },
    {
      sessionNumber: 26,
      sessionTitle: 'Ordinales, fracciones, decimales y geometría',
      sessionState: 'Pending',
      isNext: false
    },
    {
      sessionNumber: 27,
      sessionTitle: 'Geometría y fracciones',
      sessionState: 'Pending',
      isNext: false
    },
    {
      sessionNumber: 28,
      sessionTitle: 'Fracciones, decimales y gemoetría',
      sessionState: 'Pending',
      isNext: false
    },
    {
      sessionNumber: 29,
      sessionTitle: 'Ordinales, Fracciones, Decimales, Gemoetría, Numeros Enteros',
      sessionState: 'Pending',
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
