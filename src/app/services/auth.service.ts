import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/Usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface authResponse {
    token: string,
    usuario: Usuario
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private host: string = environment.host;

    public constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    public login( nombre_usuario: string, password: string ): Observable<authResponse> {
        const url = this.host + '/auth/login';

        const body = {
            nombre_usuario,
            password
        }

        return this.http.post<authResponse>(url, body);
    }

    public verificarAuth(): Observable<Usuario> {
        const url = this.host + '/auth';
        const token = localStorage.getItem('token') || '';

        const headers = new HttpHeaders()
            .set('x-token', token);

        return this.http.get<Usuario>(url, { headers });
    }

}
