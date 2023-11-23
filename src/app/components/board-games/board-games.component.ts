import { Component, OnInit } from '@angular/core';
import { BoardGamesService } from './board-games.service';
import { BoardGame } from 'src/app/models/board-game';
import { take } from 'rxjs';
import { micromark } from 'micromark';

@Component({
  selector: 'app-board-games',
  templateUrl: './board-games.component.html',
  styleUrls: ['./board-games.component.scss'],
})
export class BoardGamesComponent implements OnInit {
  constructor(private boardGamesService: BoardGamesService) {}

  public wishlistGames: BoardGame[];
  public ownedGames: BoardGame[];
  public isLoadingWishlist: boolean;
  public isLoadingOwnedList: boolean;
  public showLoadingDisclaimer: boolean;

  ngOnInit() {
    this.isLoadingWishlist = true;
    this.isLoadingOwnedList = true;
    this.populateWishlist();
    this.populateOwnedList();
    setTimeout(() => {
      this.showLoadingDisclaimer = true;
    }, 5000);
  }

  public async populateWishlist() {
    this.boardGamesService
      .getWishlistGames()
      .pipe(take(1))
      .subscribe((boardGames: BoardGame[]) => {
        this.wishlistGames = boardGames
          .sort((i) => i.priority)
          .map((g) => {
            let formattedGame = g;
            if (formattedGame.comment && formattedGame.comment.length > 0) {
              formattedGame.comment = micromark(formattedGame.comment);
            }
            return formattedGame;
          });
        this.isLoadingWishlist = false;
      });
  }

  public async populateOwnedList() {
    this.boardGamesService
      .getOwnedGames()
      .pipe(take(1))
      .subscribe((boardGames: BoardGame[]) => {
        this.ownedGames = boardGames.map((g) => {
          let formattedGame = g;
          if (formattedGame.comment && formattedGame.comment.length > 0) {
            formattedGame.comment = micromark(formattedGame.comment);
          }
          return formattedGame;
        });
        this.isLoadingOwnedList = false;
      });
  }
}
