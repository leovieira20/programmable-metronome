import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerItemListComponent } from './scheduler-item-list.component';

describe('SchedulerItemListComponent', () => {
  let component: SchedulerItemListComponent;
  let fixture: ComponentFixture<SchedulerItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulerItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
