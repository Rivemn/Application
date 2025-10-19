import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetails } from './event-details';

describe('EventDetail', () => {
  let component: EventDetails;
  let fixture: ComponentFixture<EventDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(EventDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
