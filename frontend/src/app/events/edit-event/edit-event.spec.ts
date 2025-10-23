import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEvent } from './edit-event';

describe('EditEvent', () => {
  let component: EditEvent;
  let fixture: ComponentFixture<EditEvent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditEvent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEvent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
