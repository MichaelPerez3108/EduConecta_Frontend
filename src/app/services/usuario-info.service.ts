import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioInfoService {
  private apiUserList = "http://localhost:8080/ApiUsers/usuarios";
  private apiUserInfo = "http://localhost:8080/ApiUsers/InfoUsuario";
  private apiPeticionesAmistad = "http://localhost:8080/ApiPeticiones/pendientes";
  private apiAmigos = "http://localhost:8080/ApiAmistad/listarAmigosUsuario";


  readonly userInfo = localStorage.getItem('user');
  parsedUser = this.userInfo ? JSON.parse(this.userInfo) : null;
  usuarioDatos = {
    "usuId": this.parsedUser?.usuarioId,
    "usuCorreo": this.parsedUser?.usuCorreo,
    "usuNombre": this.parsedUser?.usuNombres,
    "usuApellidos": this.parsedUser?.usuApellidos,
    "usuBiografia": this.parsedUser?.usuBiografia,
    "usuImgperfil": this.parsedUser?.usuImgperfil,
  }

  constructor(private http: HttpClient) { }

  listarUsuario(): Observable<any> {
    return this.http.get(this.apiUserList);
  }

  inforUsuario(usuarioId: string): Observable<any> {
    const url = `${this.apiUserInfo}?usuarioId=${usuarioId}`;
    return this.http.get(url);
  }

  obtenerPeticionesAmistad(usuarioId: string): Observable<any> {
    const url = `${this.apiPeticionesAmistad}?idUsuarioDestino=${usuarioId}`;
    return this.http.get(url);
  }

  listarAmigos(usuarioId: string): Observable<any> {
    const url = `${this.apiAmigos}?usuarioId=${usuarioId}`;
    return this.http.get(url);
  }
}

