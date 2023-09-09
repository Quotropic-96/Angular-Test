import { Component, Input } from '@angular/core';
import { UserTerm } from 'src/app/models/userTerm';

@Component({
  selector: 'app-term-card',
  templateUrl: './term-card.component.html',
  styleUrls: ['./term-card.component.scss'],
})
export class TermCardComponent {
  @Input() term: UserTerm = {
      courseId: '3i',
      termNumber: 1,
      totalSessions: 0,
      completedSessions: 0,
      isCompleted: false
  };

  graphSize: number = 60;
  iconSize: number = 30;
  radius: number = this.graphSize / 2;
  centerX: number = this.graphSize / 2;
  centerY: number = this.graphSize / 2;
  iconX: number = (this.graphSize - this.iconSize) / 2;
  iconY: number = (this.graphSize - this.iconSize) / 2;

  constructor() {}

  generateProgressPath(): string {
    if (this.term.totalSessions <= 0 || this.term.completedSessions <= 0) {
      return '';
    }

    const startAngle = -90;
    const endAngle = startAngle + 360 * this.term.completedSessions / this.term.totalSessions;

    // Calculate the coordinates of the arc's start and end points
    const startX = this.centerX + this.radius * Math.cos((startAngle * Math.PI) / 180);
    const startY = this.centerY + this.radius * Math.sin((startAngle * Math.PI) / 180);
    const endX = this.centerX + this.radius * Math.cos((endAngle * Math.PI) / 180);
    const endY = this.centerY + this.radius * Math.sin((endAngle * Math.PI) / 180);

    // Construct the path string for the filled portion of the circle
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    const path = [
      `M ${startX} ${startY}`,
      `A ${this.radius} ${this.radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      `L ${this.centerX} ${this.centerY}`,
      'Z' 
    ].join(' ');

    return path;
  }
}
