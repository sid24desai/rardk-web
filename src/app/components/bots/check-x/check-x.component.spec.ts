import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckXComponent } from './check-x.component';

describe('CheckXComponent', () => {
  let component: CheckXComponent;
  let fixture: ComponentFixture<CheckXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CheckXComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(CheckXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
