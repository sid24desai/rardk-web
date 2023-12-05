import { Component } from '@angular/core';
import { take } from 'rxjs';
import { LegoSet } from 'src/app/models/lego-set';
import { LegoSetsService } from './lego-sets.service';

@Component({
  selector: 'app-lego-sets',
  templateUrl: './lego-sets.component.html',
  styleUrls: ['./lego-sets.component.scss'],
})
export class LegoSetsComponent {
  public ownedSets: LegoSet[];
  public wantedSets: LegoSet[];
  public displayedOwnedColumns: string[] = ['name', 'series', 'built'];
  public displayedWantedColumns: string[] = ['name', 'series', 'owned'];
  public panelOpenState: boolean = false;

  constructor(private legoSetsService: LegoSetsService) {}
  ngOnInit(): void {
    this.legoSetsService
      .getLegoSets()
      .pipe(take(1))
      .subscribe((sets: LegoSet[]) => {
        this.ownedSets = sets
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .filter((l) => l.owned);
        this.wantedSets = sets
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .filter((l) => !l.owned);
      });
  }
}
