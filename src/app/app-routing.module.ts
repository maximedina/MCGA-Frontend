import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './Views/Security/Profile/profile.component';
import { UserComponent } from './Views/Security/User/user.component';
import { ProfileModalComponent } from './Views/Security/Profile/ProfileModal/profile-modal.component';
import { LoginComponent } from './Views/Security/Login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './Views/Home/Home.component';
import { RoleGuard } from './role/role.guard';
import { ProvinciaComponent } from './Views/Localizacion/provincia/provincia.component';
import { CiudadComponent } from './Views/Localizacion/ciudad/ciudad.component';
import { ProvinciaModalComponent } from './Views/Localizacion/provincia/provincia-modal/provincia-modal.component';
import { PasswordModalComponent } from './Views/Security/password-modal/password-modal.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component:HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent ,
    canActivate: [AuthGuard, RoleGuard],
    data: {permission: 'LEER_PERFIL'}
  },
  {
    path: 'profile-modal',
    component: ProfileModalComponent ,
    canActivate: [AuthGuard, RoleGuard],
    data: {permission: 'EDITAR_PERFIL'}
  },
  {
    path: 'user',
    component: UserComponent ,
    canActivate: [AuthGuard, RoleGuard],
    data: {permission: 'LEER_USUARIO'}
  },
  {
    path: 'provincias',
    component: ProvinciaComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {permission: 'LEER_PROVINCIA'}
  },
  {
    path: 'ciudades',
    component: CiudadComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {permission: 'LEER_CIUDAD'}
  },
  {
    path: 'password-modal',
    component: PasswordModalComponent
  }    
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
