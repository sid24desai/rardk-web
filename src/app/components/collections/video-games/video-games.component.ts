import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf, NgFor, KeyValuePipe, NgClass } from '@angular/common';
import { PageTitleComponent } from '../../shared/page-title/page-title.component';
import { GameCollectionService } from './video-games.service';
import { GameCollectionEntry } from 'src/app/models/game-collection-entry';

@Component({
  selector: 'app-video-games',
  templateUrl: './video-games.component.html',
  styleUrls: ['./video-games.component.scss'],
  standalone: true,
  imports: [
    PageTitleComponent,
    NgIf,
    MatProgressSpinnerModule,
    NgFor,
    KeyValuePipe,
    NgClass,
  ],
})
export class VideoGamesComponent implements OnInit {
  public gameCollectionItemsGrouped: { [key: string]: GameCollectionEntry[] };
  public panelOpenStates: boolean[] = [];
  public gameCollectionItems: GameCollectionEntry[];
  public isLoading: boolean;

  constructor(private gameCollectionService: GameCollectionService) {}

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
          const gameCollectionItemsFiltered = gameCollectionItems
            .filter((g) => g.category === 'Games')
            .sort((a, b) => {
              return a > b ? 1 : -1;
            });
          this.gameCollectionItemsGrouped = this.groupBy(
            gameCollectionItemsFiltered,
            'platform'
          );
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading game collection', error);
        },
      });
  }

  public groupBy(
    // found here: https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects#comment122310660_34890276
    groupOfItemsToGroup: any[],
    key: string
  ): { [key: string]: GameCollectionEntry[] } {
    return groupOfItemsToGroup.reduce(function (rv, item) {
      (rv[item[key]] = rv[item[key]] || []).push(item);
      return rv;
    }, []);
  }

  getOpen(index: number) {
    return this.panelOpenStates[index];
  }

  setOpen(index: number, isOpen: boolean) {
    this.panelOpenStates[index] = isOpen;
  }
}
