import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProblemeComponent } from './list-probleme.component';

describe('ListProblemeComponent', () => {
  let component: ListProblemeComponent;
  let fixture: ComponentFixture<ListProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProblemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
