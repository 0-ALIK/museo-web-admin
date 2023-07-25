import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { Observable } from 'rxjs';
import { Articulo } from '../models/Articulos';

@Injectable({
    providedIn: 'root'
})
export class ArticulosService {

    private host: string = environment.host;

    constructor( private http: HttpClient ) { }

    public getAll( query: string = '' ): Observable<Articulo[]> {
        const url = this.host + '/articulos/all';

        const params: HttpParams = new HttpParams()
            .set('query', query);

        return this.http.get<Articulo[]>( url, { params } );
    }

    public getById( id: number ): Observable<Articulo> {
        const url = this.http + '/articulos/' + id;
        return this.http.get<Articulo>( url );
    }

    public postArticulo( articulo: Articulo ): Observable<Articulo> {
        const url = this.host + '/articulos';
        const token = localStorage.getItem('token') || '';

        const headers = new HttpHeaders()
            .set('x-token', token);

        return this.http.post<Articulo>( url, articulo, { headers } );
    }

    public putArticulo( id: number, articulo: Articulo ): Observable<Articulo> {
        const url = this.host + '/articulos/' + id;
        const token = localStorage.getItem('token') || '';

        const headers = new HttpHeaders()
            .set('x-token', token);

        return this.http.put<Articulo>( url, articulo, { headers } );
    }

    public deleteArticulo( id: number ): Observable<Articulo> {
        const url = this.host + '/articulos/' + id;
        const token = localStorage.getItem('token') || '';

        const headers = new HttpHeaders()
            .set('x-token', token);

        return this.http.delete<Articulo>( url, { headers } );
    }
}
