import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Facultad } from '../models/Facultad';

@Injectable({
    providedIn: 'root'
})
export class FacultadesService {

    private host: string = environment.host;

    constructor( private http: HttpClient ) { }

    public getAll( query: string = '' ): Observable<Facultad[]> {
        const url = this.host + '/facultades/all';

        const params: HttpParams = new HttpParams()
            .set('query', query);

        return this.http.get<Facultad[]>( url, { params } );
    }

    public postFacultad( facultad: Facultad ): Observable<Facultad> {
        const url = this.host + '/facultades';
        const token = localStorage.getItem('token') || '';

        const headers = new HttpHeaders()
            .set('x-token', token);

        return this.http.post<Facultad>( url, facultad, { headers } );
    }

    public deleteFacultad( id: number ): Observable<Facultad> {
        const url = this.host + '/facultades/' + id;
        const token = localStorage.getItem('token') || '';

        const headers = new HttpHeaders()
            .set('x-token', token);

        return this.http.delete<Facultad>( url, { headers } );
    }

}
