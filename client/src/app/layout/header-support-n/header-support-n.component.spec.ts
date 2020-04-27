import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSupportNComponent } from './header-support-n.component';

describe('HeaderSupportNComponent', () => {
  let component: HeaderSupportNComponent;
  let fixture: ComponentFixture<HeaderSupportNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderSupportNComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSupportNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
