import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AEntityComponent } from './a-entity.component';

describe('AEntityComponent', () => {
  let component: AEntityComponent;
  let fixture: ComponentFixture<AEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
