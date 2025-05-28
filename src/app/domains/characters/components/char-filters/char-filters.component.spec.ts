import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharFiltersComponent } from './char-filters.component';

describe('CharFiltersComponent', () => {
  let component: CharFiltersComponent;
  let fixture: ComponentFixture<CharFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
