import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondDComponent } from './second-d.component';

describe('SecondDComponent', () => {
  let component: SecondDComponent;
  let fixture: ComponentFixture<SecondDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
