import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFavouriteBtnComponent } from './add-favourite-btn.component';

describe('AddFavouriteBtnComponent', () => {
  let component: AddFavouriteBtnComponent;
  let fixture: ComponentFixture<AddFavouriteBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFavouriteBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFavouriteBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
