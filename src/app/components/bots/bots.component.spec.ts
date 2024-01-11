import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotHomeComponent } from './bots.component';

describe('HomeComponent', () => {
  let component: BotHomeComponent;
  let fixture: ComponentFixture<BotHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
