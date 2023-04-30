import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSeccionesComponent } from './listar-secciones.component';

describe('ListarSeccionesComponent', () => {
  let component: ListarSeccionesComponent;
  let fixture: ComponentFixture<ListarSeccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarSeccionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSeccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
