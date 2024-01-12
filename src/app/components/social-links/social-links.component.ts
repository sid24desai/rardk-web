import { Component } from '@angular/core';
import { PageTitleComponent } from '../shared/page-title/page-title.component';

@Component({
    selector: 'app-link-buttons',
    templateUrl: './social-links.component.html',
    styleUrls: ['./social-links.component.scss'],
    standalone: true,
    imports: [PageTitleComponent]
})
export class SocialLinksComponent {

}
