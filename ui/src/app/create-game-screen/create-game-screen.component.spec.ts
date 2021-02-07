import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGameScreenComponent } from './create-game-screen.component';

describe('CreateGameScreenComponent', () => {
  let component: CreateGameScreenComponent;
  let fixture: ComponentFixture<CreateGameScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGameScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGameScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
