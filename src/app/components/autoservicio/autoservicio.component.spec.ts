import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoservicioComponent } from './autoservicio.component';

describe('AutoservicioComponent', () => {
  let component: AutoservicioComponent;
  let fixture: ComponentFixture<AutoservicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoservicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoservicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
