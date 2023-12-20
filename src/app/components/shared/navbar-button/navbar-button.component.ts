import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-button',
  templateUrl: './navbar-button.component.html',
  styleUrl: './navbar-button.component.scss',
})
export class NavbarButtonComponent {
  @Input() urlPath: string;

  public isCurrentPage() {
    return window.location.pathname === this.urlPath;
  }
}
