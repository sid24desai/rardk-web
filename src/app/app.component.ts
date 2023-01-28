import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'rardk-web';

  public openLinkTree(): void {
    window.open('https://linktr.ee/rardk64');
  }
}
