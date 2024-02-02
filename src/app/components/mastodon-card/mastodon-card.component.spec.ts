import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MastodonCardComponent } from './mastodon-card.component';

describe('MastodonCardComponent', () => {
  let component: MastodonCardComponent;
  let fixture: ComponentFixture<MastodonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [MastodonCardComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(MastodonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
