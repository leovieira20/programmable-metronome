import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerItemFormComponent } from './scheduler-item-form-component.component';

describe('SchedulerItemFormComponent', () => {
  let component: SchedulerItemFormComponent;
  let fixture: ComponentFixture<SchedulerItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulerItemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
