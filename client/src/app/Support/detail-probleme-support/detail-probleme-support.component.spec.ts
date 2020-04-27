import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProblemeSupportComponent } from './detail-probleme-support.component';

describe('DetailProblemeSupportComponent', () => {
  let component: DetailProblemeSupportComponent;
  let fixture: ComponentFixture<DetailProblemeSupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailProblemeSupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailProblemeSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
