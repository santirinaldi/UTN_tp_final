import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './Components/inicio-sesion/inicio-sesion.component';
import { CierreSesionComponent } from './Components/cierre-sesion/cierre-sesion.component';
import { EditarUsuarioComponent } from './Components/editar-usuario/editar-usuario.component';
import { RegistroUsuarioComponent } from './Components/registro-usuario/registro-usuario.component';
import { InicioComponent } from './Components/inicio/inicio.component';

import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';

import { BibliotecaRecetasComponent } from './Components/biblioteca-recetas/biblioteca-recetas.component';
import { BibliotecaRutinasComponent } from './Components/biblioteca-rutinas/biblioteca-rutinas.component';
import { VerRutinaComponent } from './Components/ver-rutina/ver-rutina.component';
import { VerRecetaComponent } from './Components/ver-receta/ver-receta.component';



/*const routes: Routes = [
  
  { path: 'inicioSesion', component: InicioSesionComponent },
  { path: 'cierreSesion', component: CierreSesionComponent },
  { path: 'editarUsuario', component: EditarUsuarioComponent },
  { path: 'registroUsuario', component: RegistroUsuarioComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'bibliotecaRecetas', component: BibliotecaRecetasComponent},
  { path: 'bibliotecaRutinas', component: BibliotecaRutinasComponent},
  { path: 'verRutina', component: VerRutinaComponent},
  { path: 'verReceta', component: VerRecetaComponent},
  { path: '**', redirectTo: '404'},
  { path: '', redirectTo: 'inicioSesion', pathMatch: 'full'}*/

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'inicio-sesion', component: InicioSesionComponent },
  { path: 'cierre-sesion', component: CierreSesionComponent },
  { path: 'editar-usuario', component: EditarUsuarioComponent },
  { path: 'registro-usuario', component: RegistroUsuarioComponent },
  { path: '', component: InicioComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
