import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarFamiliasComponent } from './listar-familias.component';

describe('ListarFamiliasComponent', () => {
  let component: ListarFamiliasComponent;
  let fixture: ComponentFixture<ListarFamiliasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarFamiliasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarFamiliasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
