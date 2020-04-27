import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProblemesComponent } from './my-problemes.component';

describe('MyProblemesComponent', () => {
  let component: MyProblemesComponent;
  let fixture: ComponentFixture<MyProblemesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProblemesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProblemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
