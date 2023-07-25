import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Carrera } from '../models/Carrera';

@Injectable({
    providedIn: 'root'
})
export class CarrerasService {

    private host: string = environment.host;

    constructor( private http: HttpClient ) { }

    public getAll( query: string = '' ): Observable<Carrera[]> {
        const url = this.host + '/carreras/all';

        const params: HttpParams = new HttpParams()
            .set('query', query);

        return this.http.get<Carrera[]>( url, { params } );
    }

    public getAllByFacultad( facultad_id: number ): Observable<Carrera[]> {
        const url = this.host + '/carreras/facultad/' + facultad_id;
        return this.http.get<Carrera[]>( url )
    }

    public postCarrera( carrera: Carrera ): Observable<Carrera> {
        const url = this.host + '/carreras';
        const token = localStorage.getItem('token') || '';

        const headers = new HttpHeaders()
            .set('x-token', token);

        return this.http.post<Carrera>( url, carrera, { headers } );
    }

    public deleteCarrera( id: number ): Observable<Carrera> {
        const url = this.host + '/carreras/' + id;
        const token = localStorage.getItem('token') || '';

        const headers = new HttpHeaders()
            .set('x-token', token);

        return this.http.delete<Carrera>( url, { headers } );
    }
}
