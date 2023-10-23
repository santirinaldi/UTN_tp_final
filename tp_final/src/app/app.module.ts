import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RegistroUsuarioComponent } from './Components/registro-usuario/registro-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroUsuarioComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
