import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class SearchMenuService {

    private _termino: string = "";

    private busquedaSubject: Subject<string> = new Subject<string>();

    public get termino(): string {
        return this._termino;
    }

    public set termino( termino: string ) {
        this._termino = termino;
    }

    public desencadenarBusqueda(): void {
        this.busquedaSubject.next( this._termino );
    }

    public realizarBusqueda(): Observable<string> {
        return this.busquedaSubject.asObservable();
    }

    constructor() { }
}
