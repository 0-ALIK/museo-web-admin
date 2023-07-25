import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../models/Categoria';

@Injectable({
    providedIn: 'root'
})
export class CategoriasService {

    private host: string = environment.host;

    constructor( private http: HttpClient ) { }

    public getAll( query: string = '' ): Observable<Categoria[]> {
        const url = this.host + '/categorias/all';

        const params: HttpParams = new HttpParams()
            .set('query', query);

        return this.http.get<Categoria[]>( url, { params } );
    }

    public postCategoria( categoria: Categoria ): Observable<Categoria> {
        const url = this.host + '/categorias';
        const token = localStorage.getItem('token') || '';

        const headers = new HttpHeaders()
            .set('x-token', token);

        return this.http.post<Categoria>( url, categoria, { headers } );
    }

    public deleteCategoria( id: number ): Observable<Categoria> {
        const url = this.host + '/categorias/' + id;
        const token = localStorage.getItem('token') || '';

        const headers = new HttpHeaders()
            .set('x-token', token);

        return this.http.delete<Categoria>( url, { headers } );
    }

}
