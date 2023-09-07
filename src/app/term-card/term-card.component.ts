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

  ngOnInit() {
    this.isFullCircle = this.completedSessions === this.totalSessions;
  }

  generateProgressPath(): string {
    if (this.totalSessions <= 0 || this.completedSessions <= 0) {
      return '';
    }

    const radius = 40; // Radius of the circle
    const centerX = 50; // X-coordinate of the circle center
    const centerY = 50; // Y-coordinate of the circle center
    const startAngle = 0; // Start angle (top of the circle)
    const endAngle = (360 * this.completedSessions) / this.totalSessions; // Calculate the end angle

    // Calculate the coordinates of the arc's start and end points
    const startX = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
    const startY = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
    const endX = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
    const endY = centerY + radius * Math.sin((endAngle * Math.PI) / 180);

    // Construct the path string for the filled portion of the circle
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    const path = [
      `M ${startX} ${startY}`, // Move to the start point
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Draw an arc (clockwise)
      `L ${centerX} ${centerY}`, // Draw a line to the center
      'Z' // Close the path to create a filled sector
    ].join(' ');

    return path;
  }
}
