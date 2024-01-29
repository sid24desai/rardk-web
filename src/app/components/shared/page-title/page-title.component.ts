import { NgClass, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.scss',
  standalone: true,
  imports: [NgIf, NgClass],
})
export class PageTitleComponent implements OnInit {
  @Input() titleSize: number;

  ngOnInit(): void {
    console.log('titlesize', this.titleSize);
  }
}
