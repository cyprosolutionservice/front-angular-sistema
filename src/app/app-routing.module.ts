import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { PrivateComponent } from './components/private/private.component';
import { TerminosComponent } from './components/terminos/terminos.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'terminos', component: TerminosComponent},
  { path: 'private', component: PrivateComponent, canActivate: [AuthGuard]},
  { path: 'admin', component: AdminComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin'}},
  { path: 'login', component: LoginComponent},
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard]},
  { path: '**', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
