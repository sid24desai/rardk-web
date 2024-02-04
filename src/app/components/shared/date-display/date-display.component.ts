import { Component, Input, OnInit } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-date-display',
  templateUrl: './date-display.component.html',
  styleUrl: './date-display.component.scss',
  standalone: true,
})
export class DateDisplayComponent implements OnInit {
  @Input() dateToDisplay: string;
  public formattedDate: string;

  ngOnInit(): void {
    if (this.dateToDisplay) {
      this.formattedDate = DateTime.fromJSDate(
        new Date(this.dateToDisplay)
      ).toLocaleString(DateTime.DATE_HUGE);
    }
  }
}
