import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './Components/inicio-sesion/inicio-sesion.component';
import { CierreSesionComponent } from './Components/cierre-sesion/cierre-sesion.component';
import { EditarUsuarioComponent } from './Components/editar-usuario/editar-usuario.component';
import { RegistroUsuarioComponent } from './Components/registro-usuario/registro-usuario.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { BibliotecaRecetasComponent } from './Components/biblioteca-recetas/biblioteca-recetas.component';



const routes: Routes = [
  
  { path: 'inicioSesion', component: InicioSesionComponent },
  { path: 'cierreSesion', component: CierreSesionComponent },
  { path: 'editarUsuario', component: EditarUsuarioComponent },
  { path: 'registroUsuario', component: RegistroUsuarioComponent },
  { path: 'inicio', component: InicioComponent },
  {path: 'bibliotecaRecetas', component: BibliotecaRecetasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}