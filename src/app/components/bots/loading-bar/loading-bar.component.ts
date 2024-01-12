import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-loading-bar',
    templateUrl: './loading-bar.component.html',
    styleUrls: ['./loading-bar.component.scss'],
    standalone: true,
    imports: [NgIf, MatProgressBarModule],
})
export class LoadingBarComponent {
  @Input() public isLoading: boolean;
}
