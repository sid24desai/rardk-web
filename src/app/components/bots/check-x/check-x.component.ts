import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-check-x',
    templateUrl: './check-x.component.html',
    styleUrls: ['./check-x.component.scss'],
    standalone: true,
    imports: [NgIf, MatIconModule],
})
export class CheckXComponent {
  @Input() isCheck: boolean = false;
}
