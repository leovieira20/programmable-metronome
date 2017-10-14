import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProgramsComponent } from './my-programs.component';

describe('MyProgramsComponent', () => {
  let component: MyProgramsComponent;
  let fixture: ComponentFixture<MyProgramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProgramsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
