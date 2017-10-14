import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalControlsComponent } from './global-controls.component';

describe('GlobalControlsComponent', () => {
  let component: GlobalControlsComponent;
  let fixture: ComponentFixture<GlobalControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
