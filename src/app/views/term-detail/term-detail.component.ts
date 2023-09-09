import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserTerm } from 'src/app/models/userTerm';

@Component({
  selector: 'app-term-detail',
  templateUrl: './term-detail.component.html',
  styleUrls: ['./term-detail.component.scss'],
})
export class TermDetailComponent implements OnInit {
  term: UserTerm = {
      courseId: '3i',
      termNumber: 1,
      totalSessions: 0,
      completedSessions: 0,
      isCompleted: false
  }
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

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.termId = params['id'];
      // Fetch term info from db
      this.termNumber = parseInt(this.termId);
      this.completedSessions = 20;
      this.totalSessions = 50;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
