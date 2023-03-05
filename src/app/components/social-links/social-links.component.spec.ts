import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialLinksComponent } from './link-buttons.component';

describe('SocialLinksComponent', () => {
  let component: SocialLinksComponent;
  let fixture: ComponentFixture<SocialLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialLinksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
