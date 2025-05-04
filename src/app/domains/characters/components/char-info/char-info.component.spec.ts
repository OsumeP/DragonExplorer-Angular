import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharInfoComponent } from './char-info.component';

describe('CharInfoComponent', () => {
  let component: CharInfoComponent;
  let fixture: ComponentFixture<CharInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
