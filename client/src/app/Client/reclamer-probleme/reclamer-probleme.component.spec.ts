import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamerProblemeComponent } from './reclamer-probleme.component';

describe('ReclamerProblemeComponent', () => {
  let component: ReclamerProblemeComponent;
  let fixture: ComponentFixture<ReclamerProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReclamerProblemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamerProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
