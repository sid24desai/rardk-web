import { Component } from '@angular/core';
import { take } from 'rxjs';
import { LetterboxdItem } from 'src/app/models/letterboxd-item';
import { LetterboxdService } from './letterboxd.service';

@Component({
  selector: 'app-letterboxd-card',
  templateUrl: './letterboxd-card.component.html',
  styleUrls: ['./letterboxd-card.component.scss'],
})
export class LetterboxdCardComponent {
  public isLoading: boolean;
  public letterboxdItems: LetterboxdItem[];
  private numberOfMoviesToList = 5;

  constructor(private letterboxdService: LetterboxdService) {}

  ngOnInit() {
    this.isLoading = true;
    this.populateLetterboxdItems();
  }

  public async populateLetterboxdItems() {
    this.letterboxdService
      .getLetterboxdFeed()
      .pipe(take(1))
      .subscribe((result: LetterboxdItem[]) => {
        this.letterboxdItems = result.slice(0, this.numberOfMoviesToList);
        this.isLoading = false;
      });
  }
}
