import { Component, Input } from '@angular/core';
import { Session } from 'src/app/models/session.interface';

@Component({
  selector: 'app-session-card',
  templateUrl: './session-card.component.html',
  styleUrls: ['./session-card.component.scss'],
})
export class SessionCardComponent {
  @Input() session: Session = {
    sessionNumber: 0,
    sessionTitle: '',
    isDone: false,
    isNext: false,
  };
}
