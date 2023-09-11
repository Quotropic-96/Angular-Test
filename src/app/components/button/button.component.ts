import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() isPrimary: boolean = false;
  @Input() isActive: boolean = false;
  @Input() isIcon: boolean = false;
  @Input() iconName: string = '';
  @Input() buttonText: string = '';
  @Input() rawToUrl: string = '';

  toUrl: string[] = [];

  constructor() {};

  ngOnInit() : void {
    const splitUrl = this.rawToUrl.split(':');
    if (this.rawToUrl.length === 0) {
      this.toUrl = ['#'];
    } else if (splitUrl.length > 1) {
      this.toUrl = splitUrl;
    } else {
      this.toUrl.push(this.rawToUrl);
    }
  }
}
