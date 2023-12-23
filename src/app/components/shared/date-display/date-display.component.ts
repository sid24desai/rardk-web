import { Component, Input, OnInit } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-date-display',
  templateUrl: './date-display.component.html',
  styleUrl: './date-display.component.scss',
})
export class DateDisplayComponent implements OnInit {
  @Input() dateToDisplay: string;
  public formattedDate: string;

  ngOnInit(): void {
    if (this.dateToDisplay) {
      const easternDate = DateTime.fromFormat(
        this.dateToDisplay,
        'MM/dd/yyyy tt ZZ',
        {
          zone: 'America/New_York',
        }
      );
      this.formattedDate = easternDate.toLocaleString(DateTime.DATE_HUGE);
    }
  }
}
