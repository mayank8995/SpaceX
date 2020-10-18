import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceXLaunchProgramComponent } from './space-x-launch-program.component';

describe('SpaceXLaunchProgramComponent', () => {
  let component: SpaceXLaunchProgramComponent;
  let fixture: ComponentFixture<SpaceXLaunchProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaceXLaunchProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceXLaunchProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
