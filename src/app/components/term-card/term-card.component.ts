import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-term-card',
  templateUrl: './term-card.component.html',
  styleUrls: ['./term-card.component.scss']
})
export class TermCardComponent {
  @Input({ required: true }) term: number = 0;
  @Input({ required: true }) completedSessions: number = 0;
  @Input({ required: true }) totalSessions: number = 0;

  isFullCircle: boolean = false;

  graphSize: number = 60;
  iconSize: number = 30;
  radius: number = this.graphSize / 2;
  centerX: number = this.graphSize / 2;
  centerY: number = this.graphSize / 2;
  iconX: number = (this.graphSize - this.iconSize) / 2;
  iconY: number = (this.graphSize - this.iconSize) / 2;

  ngOnInit() {
    this.isFullCircle = this.completedSessions === this.totalSessions;
  }

  generateProgressPath(): string {
    if (this.totalSessions <= 0 || this.completedSessions <= 0) {
      return '';
    }

    const startAngle = -90;
    const endAngle = startAngle + 360 * this.completedSessions / this.totalSessions;

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
