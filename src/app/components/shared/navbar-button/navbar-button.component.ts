import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-navbar-button',
    templateUrl: './navbar-button.component.html',
    styleUrl: './navbar-button.component.scss',
    standalone: true,
    imports: [RouterLink, NgClass],
})
export class NavbarButtonComponent {
  @Input() urlPath: string;

  public isCurrentPage() {
    return window.location.pathname === this.urlPath;
  }
}
