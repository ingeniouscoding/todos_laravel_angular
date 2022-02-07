import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isActive = false;

  constructor() { }

  onClick(): void {
    this.isActive = !this.isActive;
  }
}
