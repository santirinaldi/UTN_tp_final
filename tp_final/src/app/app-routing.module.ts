import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './Components/inicio-sesion/inicio-sesion.component';
import { CierreSesionComponent } from './Components/cierre-sesion/cierre-sesion.component';
import { EditarUsuarioComponent } from './Components/editar-usuario/editar-usuario.component';
import { RegistroUsuarioComponent } from './Components/registro-usuario/registro-usuario.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { BibliotecaRecetasComponent } from './Components/biblioteca-recetas/biblioteca-recetas.component';
import { BibliotecaRutinasComponent } from './Components/biblioteca-rutinas/biblioteca-rutinas.component';
import { VerRutinaComponent } from './Components/ver-rutina/ver-rutina.component';
import { VerRecetaComponent } from './Components/ver-receta/ver-receta.component';

import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { PerfilUsuarioComponent } from './Components/perfil-usuario/perfil-usuario.component';
import { authGuard, authLogged } from './services/auth/auth.guard';


const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'inicio-sesion', component: InicioSesionComponent,  canActivate: [authLogged] },
  { path: 'registro-usuario', component: RegistroUsuarioComponent, canActivate: [authLogged] },
  {
    path: 'cierre-sesion',
    component: CierreSesionComponent,
    canActivate: [authGuard],
  },
  {
    path: 'editar-usuario',
    component: EditarUsuarioComponent,
    canActivate: [authGuard],
  },
  {
    path: 'bibliotecaRecetas',
    component: BibliotecaRecetasComponent,
    canActivate: [authGuard],
  },
  {
    path: 'bibliotecaRutinas',
    component: BibliotecaRutinasComponent,
    canActivate: [authGuard],
  },
  {
    path: 'verRutina',
    component: VerRutinaComponent,
    canActivate: [authGuard],
  },
  {
    path: 'verReceta',
    component: VerRecetaComponent,
    canActivate: [authGuard],
  },
  {
    path: 'perfil-usuario',
    component: PerfilUsuarioComponent,
    canActivate: [authGuard],
  },
  { path: '', 
    redirectTo: 'inicio', 
    pathMatch: 'full' 
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
