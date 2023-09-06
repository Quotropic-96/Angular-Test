import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-term-card',
  templateUrl: './term-card.component.html',
  styleUrls: ['./term-card.component.scss']
})
export class TermCardComponent {
  @Input({ required: true }) term: string | undefined;
  @Input({ required: true }) completedSessions: string | undefined;
  @Input({ required: true }) totalSessions: string | undefined;
}
