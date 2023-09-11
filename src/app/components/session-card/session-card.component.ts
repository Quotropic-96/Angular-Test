import { Component, Input } from '@angular/core';
import { UserSession, defaultUserSession } from 'src/app/models/userSession.interface';

@Component({
  selector: 'app-session-card',
  templateUrl: './session-card.component.html',
  styleUrls: ['./session-card.component.scss'],
})
export class SessionCardComponent {
  @Input() session: UserSession = defaultUserSession;

  constructor() {};
}
