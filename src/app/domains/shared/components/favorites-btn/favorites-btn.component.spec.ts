import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesBtnComponent } from './favorites-btn.component';

describe('FavoritesBtnComponent', () => {
  let component: FavoritesBtnComponent;
  let fixture: ComponentFixture<FavoritesBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
