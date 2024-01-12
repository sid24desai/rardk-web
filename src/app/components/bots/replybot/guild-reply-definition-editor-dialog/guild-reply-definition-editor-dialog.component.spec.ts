import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildReplyDefinitionEditorDialogComponent } from './guild-reply-definition-editor-dialog.component';

describe('GuildReplyDefinitionEditorDialogComponent', () => {
  let component: GuildReplyDefinitionEditorDialogComponent;
  let fixture: ComponentFixture<GuildReplyDefinitionEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [GuildReplyDefinitionEditorDialogComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(GuildReplyDefinitionEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
