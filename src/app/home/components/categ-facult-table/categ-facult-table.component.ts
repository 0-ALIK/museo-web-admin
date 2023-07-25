import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/models/Categoria';
import { Facultad } from 'src/app/models/Facultad';
import { CategoriasService } from 'src/app/services/categorias.service';
import { FacultadesService } from 'src/app/services/facultades.service';
import { SearchMenuService } from 'src/app/services/search-menu.service';
import { CreateCategFacultComponent } from '../create-categ-facult/create-categ-facult.component';

@Component({
    selector: 'app-categ-facult-table',
    templateUrl: './categ-facult-table.component.html',
    providers: [ DialogService, MessageService ]
})
export class CategFacultTableComponent implements OnInit, OnDestroy {

    @Input('tipo')
    public tipo: string = '';

    public subs: Subscription[] = [];

    public datos: Facultad[] | Categoria[] = [];

    public createCategFacultRef: DynamicDialogRef | undefined;

    public constructor(
        private categoriasService: CategoriasService,
        private facultadesService: FacultadesService,
        private searchMenuService: SearchMenuService,
        private messageService: MessageService,
        private dialogService: DialogService
    ) {}

    public ngOnInit(): void {
        let sub = new Subscription();

        if( this.tipo === 'categoria' ) {
            sub = this.categoriasService.getAll().subscribe({
                next: categorias => {
                    this.datos = categorias;
                }
            });
        }

        if( this.tipo === 'facultad' ) {
            sub = this.facultadesService.getAll().subscribe({
                next: facultades => {
                    this.datos = facultades;
                }
            });
        }

        const subSearchMenu = this.searchMenuService.realizarBusqueda().subscribe({
            next: termino => {
                this.buscarCarrerasByName( termino );
            }
        });

        this.subs.push( sub )
        this.subs.push( subSearchMenu );
    }

    private buscarCarrerasByName( termino: string ): void {
        let sub = new Subscription();

        if( this.tipo === 'categoria' ) {
            sub = this.categoriasService.getAll( termino ).subscribe({
                next: categorias => {
                    this.datos = categorias;
                }
            });
        }

        if( this.tipo === 'facultad' ) {
            sub = this.facultadesService.getAll( termino ).subscribe({
                next: facultades => {
                    this.datos = facultades;
                }
            });
        }

        this.subs.push( sub );
    }

    public onClickAgregar(): void {

        this.createCategFacultRef = this.dialogService.open( CreateCategFacultComponent, {
            data: {
                tipo: this.tipo
            },
            header: 'Agregue una nueva '+this.tipo,
            width: '70%',
            height: '70%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true
        });

        this.createCategFacultRef.onClose.subscribe({
            next: ( dato: Facultad | Categoria ) => {
                if( !dato ) return;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Creado',
                    detail: dato.nombre
                });
                this.datos.push( dato );
            }
        });
    }

    public OnClickEliminar(  id: number, button: Button ): void {
        let sub = new Subscription();
        button.loading = true;

        if( this.tipo === 'categoria' ) {
            sub = this.categoriasService.deleteCategoria( id ).subscribe({
                next: categoriaRes => {
                    this.datos = this.datos.filter( categoria => categoria.id !== categoriaRes.id );
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Borrado',
                        detail: categoriaRes.nombre
                    });
                    button.loading = false;
                }
            });
        }

        if( this.tipo === 'facultad' ) {
            sub = this.facultadesService.deleteFacultad( id ).subscribe({
                next: facultadRes => {
                    this.datos = this.datos.filter( facultad => facultad.id !== facultadRes.id );
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Borrado',
                        detail: facultadRes.nombre
                    });
                    button.loading = false;
                }
            });
        }

        this.subs.push( sub );
    }

    public ngOnDestroy(): void {
        if(this.subs.length !== 0)
            this.subs.forEach( sub => sub.unsubscribe() );
    }

}
