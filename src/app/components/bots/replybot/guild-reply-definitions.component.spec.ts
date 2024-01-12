import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildReplyDefinitionsComponent } from './guild-reply-definitions.component';

describe('ReplybotComponent', () => {
  let component: GuildReplyDefinitionsComponent;
  let fixture: ComponentFixture<GuildReplyDefinitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [GuildReplyDefinitionsComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(GuildReplyDefinitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
