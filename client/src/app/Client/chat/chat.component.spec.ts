import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatClientComponent } from './chat.component';

describe('ChatComponent', () => {
  let component: ChatClientComponent;
  let fixture: ComponentFixture<ChatClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatClientComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
