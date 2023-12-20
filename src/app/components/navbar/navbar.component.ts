import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isSocialEnabled: boolean = environment.isSocialEnabled;
  ngOnInit(): void {
    console.log(window.location.pathname);
  }
  public isCurrentPage() {
    console.log(window.location.pathname);
  }
}
