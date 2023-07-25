import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/Usuario';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    private host: string = environment.host;

    constructor( private http: HttpClient ) { }

    public getAll( query: string = '' ): Observable<Usuario[]> {
        const url = this.host + '/usuarios/all';

        const params: HttpParams = new HttpParams()
            .set('query', query);

        return this.http.get<Usuario[]>( url, { params } );
    }

    public deleteUsuario( id: string ): Observable<Usuario> {
        const url = this.host + '/usuarios/' + id;
        const token = localStorage.getItem('token') || '';

        const headers = new HttpHeaders()
            .set('x-token', token);

        return this.http.delete<Usuario>( url, { headers } );
    }

}
