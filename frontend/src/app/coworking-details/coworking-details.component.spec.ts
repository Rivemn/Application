import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoworkingDetailsComponent } from './coworking-details.component';

describe('CoworkingDetailsComponent', () => {
  let component: CoworkingDetailsComponent;
  let fixture: ComponentFixture<CoworkingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoworkingDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoworkingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
