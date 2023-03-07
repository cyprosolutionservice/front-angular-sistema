import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  listUsers: any[] = [];

  constructor(private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this.authService.obtenerUsers().subscribe( (res:any) =>{
      if (!res.error) {
      console.log(res);
      this.listUsers = res;
      }else{
        console.log('Usuarios No encontrado en la base de Datos');
        this.toastr.error('Error', 'Error al buscar Usuarios')
      }
        
    });
  }

  getEvento(user: any){
    console.log('Hicciste click en '+user.NOMBRE);
    // localStorage.setItem('id', user.CODUSUARIO);
    this.router.navigate(['editar-usuario', user.CODUSUARIO]);
  }

}
