import { Component } from '@angular/core';
import { BotPageComponent } from '../page/bot-page.component';

@Component({
  selector: 'app-login-actions',
  templateUrl: './login-actions.component.html',
  styleUrls: ['./login-actions.component.css'],
})
export class LoginActionsComponent extends BotPageComponent {
  public confirmLogOut() {
    if (confirm('Are you sure you want to log out of your Discord account?')) {
      this.logOutAndRedirect();
    }
  }
}
