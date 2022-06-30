import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubModelsComponent } from './sub-models.component';

describe('SubModelsComponent', () => {
  let component: SubModelsComponent;
  let fixture: ComponentFixture<SubModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
