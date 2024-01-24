import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf, NgFor } from '@angular/common';
import { PageTitleComponent } from '../../shared/page-title/page-title.component';
import { GameCollectionService } from './video-games.service';
import { GameCollectionEntry } from 'src/app/models/game-collection-entry';

@Component({
  selector: 'app-video-games',
  templateUrl: './video-games.component.html',
  styleUrls: ['./video-games.component.scss'],
  standalone: true,
  imports: [PageTitleComponent, NgIf, MatProgressSpinnerModule, NgFor],
})
export class VideoGamesComponent implements OnInit {
  constructor(private gameCollectionService: GameCollectionService) {}

  public gameCollectionItems: GameCollectionEntry[];
  public isLoading: boolean;

  ngOnInit() {
    this.isLoading = true;
    this.populateGameCollection();
  }

  public async populateGameCollection() {
    this.gameCollectionService
      .getGameCollection()
      .pipe(take(1))
      .subscribe({
        next: (gameCollectionItems: GameCollectionEntry[]) => {
          this.gameCollectionItems = gameCollectionItems.filter(
            (g) => g.category === 'Games'
          );
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading wishlist', error);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
      });
  }
}
