import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplybotServerSelectorComponent } from './replybot-server-selector.component';

describe('BotControlPanelsComponent', () => {
  let component: ReplybotServerSelectorComponent;
  let fixture: ComponentFixture<ReplybotServerSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReplybotServerSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReplybotServerSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
