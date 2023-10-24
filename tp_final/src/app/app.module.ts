import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RegistroUsuarioComponent } from './Components/registro-usuario/registro-usuario.component';
import { BorrarUsuarioComponent } from './Components/borrar-usuario/borrar-usuario.component';
import { InicioSesionComponent } from './Components/inicio-sesion/inicio-sesion.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RegistroUsuarioComponent,
    BorrarUsuarioComponent,
    InicioSesionComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
