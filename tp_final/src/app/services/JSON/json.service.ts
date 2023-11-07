import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Usuario } from 'src/app/Models/usuario';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JSONService {

  private apiURL = "http://localhost:3000/users";
  private user: Object = {};
  private usersList: Object[] = [];

  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  getAll(): Observable<any> {
    return this.http.get<Usuario[]>(this.apiURL);
  }

  add(usuario: Usuario):Observable<any> {

    this.user = {
      id: usuario.id,
      name: usuario.name,
      lastName: usuario.lastName,
      email: usuario.email,
      passWord: usuario.passWord,
      baja: usuario.baja,
      bibliotecaRutina: usuario.bibliotecaRutinas,
      bibliotecaReceta: usuario.bibliotecaRecetas
    };

    return this.http.post(this.apiURL, this.user)
    .pipe(
      tap(() => {
        this.refresh$.next();
      })
    )
  }

  putUser(usuario: Usuario):Observable<any> {
    return this.http.put(`http://localhost:3000/users/${usuario.id}`,usuario)
    .pipe(
      tap(() => {
        this.refresh$.next();
      })
    )
  }
}
