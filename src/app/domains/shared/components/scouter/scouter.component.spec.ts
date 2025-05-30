import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScouterComponent } from './scouter.component';

describe('ScouterComponent', () => {
  let component: ScouterComponent;
  let fixture: ComponentFixture<ScouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScouterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
