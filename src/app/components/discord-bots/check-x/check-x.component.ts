import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-check-x',
  templateUrl: './check-x.component.html',
  styleUrls: ['./check-x.component.css'],
})
export class CheckXComponent {
  @Input() isCheck: boolean = false;
}
