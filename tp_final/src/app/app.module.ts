import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RegistroUsuarioComponent } from './Components/registro-usuario/registro-usuario.component';
import { BorrarUsuarioComponent } from './Components/borrar-usuario/borrar-usuario.component';
import { InicioSesionComponent } from './Components/inicio-sesion/inicio-sesion.component';
import { FormsModule } from '@angular/forms';
import { EditarUsuarioComponent } from './Components/editar-usuario/editar-usuario.component';
import { CierreSesionComponent } from './Components/cierre-sesion/cierre-sesion.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { AgregarRutinaComponent } from './Components/agregar-rutina/agregar-rutina.component';
import { BibliotecaRutinasComponent } from './Components/biblioteca-rutinas/biblioteca-rutinas.component';
import { BibliotecaRecetasComponent } from './Components/biblioteca-recetas/biblioteca-recetas.component';
import { ConsultarRecetaComponent } from './Components/consultar-receta/consultar-receta.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';

import { PerfilUsuarioComponent } from './Components/perfil-usuario/perfil-usuario.component';
import { VerRutinaComponent } from './Components/ver-rutina/ver-rutina.component';
import { VerRecetaComponent } from './Components/ver-receta/ver-receta.component';
import { EBibliotecaRecetasComponent } from './Components/e-biblioteca-recetas/e-biblioteca-recetas.component';
import { EBibliotecaRutinasComponent } from './Components/e-biblioteca-rutinas/e-biblioteca-rutinas.component';
import { FiltroPipe } from './pipes/filtro.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RegistroUsuarioComponent,
    BorrarUsuarioComponent,
    InicioSesionComponent,
    EditarUsuarioComponent,
    CierreSesionComponent,
    InicioComponent,
    AgregarRutinaComponent,
    BibliotecaRutinasComponent,
    BibliotecaRecetasComponent,
    ConsultarRecetaComponent,
    NavbarComponent,
    PerfilUsuarioComponent,
    VerRutinaComponent,
    VerRecetaComponent,
    EBibliotecaRecetasComponent,
    EBibliotecaRutinasComponent,
    FiltroPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
