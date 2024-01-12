import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageTitleComponent } from '../shared/page-title/page-title.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [
        PageTitleComponent,
        RouterLink,
        NgIf,
    ],
})
export class HomeComponent {
  public isSocialEnabled: boolean = environment.isSocialEnabled;
}
