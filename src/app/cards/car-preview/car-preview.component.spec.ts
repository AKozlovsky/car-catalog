import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPreviewComponent } from './car-preview.component';

describe('CarPreviewComponent', () => {
  let component: CarPreviewComponent;
  let fixture: ComponentFixture<CarPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
