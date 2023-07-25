import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { Subscription } from 'rxjs';
import { Articulo } from 'src/app/models/Articulos';
import { ArticulosService } from 'src/app/services/articulos.service';
import { SearchMenuService } from 'src/app/services/search-menu.service';

@Component({
    selector: 'app-articulos-table',
    templateUrl: './articulos-table.component.html',
    providers: [ ConfirmationService, MessageService ]
})
export class ArticulosTableComponent implements OnInit, OnDestroy {

    public subs: Subscription[] = [];

    public button!: Button;

    public articulos: Articulo[] = [];

    public constructor(
        private articulosService: ArticulosService,
        private searchMenuService: SearchMenuService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    public ngOnInit(): void {
        const sub = this.articulosService.getAll().subscribe({
            next: articulos => {
                this.articulos = articulos;
            }
        });

        const sub2 = this.searchMenuService.realizarBusqueda().subscribe({
            next: termino => {
                this.buscarByName( termino );
            }
        });

        this.subs.push( sub );
        this.subs.push( sub2 );
    }

    public OnClickEliminarConfirm( event: Event, id: number ): void {

        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure that you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.OnClickEliminar( id );
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            }
        });
    }

    public OnClickEliminar( id:number ): void {

        const sub = this.articulosService.deleteArticulo( id ).subscribe({
            next: articuloRes => {
                this.articulos = this.articulos.filter( articulo => articulo.id !== articuloRes.id );
                this.messageService.add({
                    severity: 'success',
                    summary: 'Borrado',
                    detail: articuloRes.nombre
                });
            }
        });


        this.subs.push( sub );
    }

    public buscarByName( termino: string ) {
        const sub = this.articulosService.getAll( termino ).subscribe({
            next: articulos => {
                this.articulos = articulos;
            }
        });

        this.subs.push( sub );
    }

    public ngOnDestroy(): void {
        if(this.subs.length !== 0)
            this.subs.forEach( sub => sub.unsubscribe() );
    }

}
