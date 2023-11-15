import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './Components/inicio-sesion/inicio-sesion.component';
import { CierreSesionComponent } from './Components/cierre-sesion/cierre-sesion.component';
import { EditarUsuarioComponent } from './Components/editar-usuario/editar-usuario.component';
import { RegistroUsuarioComponent } from './Components/registro-usuario/registro-usuario.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';

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
