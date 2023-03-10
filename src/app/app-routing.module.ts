import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CrearFamiliaComponent } from './components/crear-familia/crear-familia.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { HomeComponent } from './components/home/home.component';
import { ListarFamiliasComponent } from './components/listar-familias/listar-familias.component';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { LoginComponent } from './components/login/login.component';
import { Login2Component } from './components/login2/login2.component';
import { MenuComponent } from './components/menu/menu.component';
import { PrivateComponent } from './components/private/private.component';
import { TerminosComponent } from './components/terminos/terminos.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'terminos', component: TerminosComponent},
  { path: 'private', component: PrivateComponent, canActivate: [AuthGuard]},
  { path: 'listar-usuarios', component: ListarUsuariosComponent, canActivate: [AuthGuard]},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { expectedRole: 'admin'}},
  { path: 'login2', component: Login2Component, canActivate: [AuthGuard]},
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard]},
  { path: 'crear-usuario', component: CrearUsuarioComponent, canActivate: [AuthGuard]},
  { path: 'editar-usuario/:id', component: EditarUsuarioComponent, canActivate: [AuthGuard]},
  { path: 'listar-familias', component: ListarFamiliasComponent, canActivate: [AuthGuard]},
  { path: 'crear-familia', component: CrearFamiliaComponent, canActivate: [AuthGuard]},
  
  { path: '**', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
