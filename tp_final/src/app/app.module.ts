import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegistroUsuarioComponent } from './Components/registro-usuario/registro-usuario.component';
import { BorrarUsuarioComponent } from './Components/borrar-usuario/borrar-usuario.component';
import { InicioSesionComponent } from './Components/inicio-sesion/inicio-sesion.component';
import { FormsModule } from '@angular/forms';
import { AgregarRutinaComponent } from './Components/agregar-rutina/agregar-rutina.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroUsuarioComponent,
    BorrarUsuarioComponent,
    InicioSesionComponent,
    AgregarRutinaComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
