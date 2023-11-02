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

@NgModule({
  declarations: [
    AppComponent,
    RegistroUsuarioComponent,
    BorrarUsuarioComponent,
    InicioSesionComponent,
    EditarUsuarioComponent,
    CierreSesionComponent,
    InicioComponent,
    AgregarRutinaComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
