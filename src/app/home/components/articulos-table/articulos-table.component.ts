import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Articulo } from 'src/app/models/Articulos';
import { Categoria } from 'src/app/models/Categoria';
import { ArticulosService } from 'src/app/services/articulos.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { SearchMenuService } from 'src/app/services/search-menu.service';
import { FormArticulosComponent } from '../form-articulos/form-articulos.component';
import { Button } from 'primeng/button';

@Component({
    selector: 'app-articulos-table',
    templateUrl: './articulos-table.component.html',
    providers: [ ConfirmationService, MessageService, DialogService ]
})
export class ArticulosTableComponent implements OnInit, OnDestroy {

    public subs: Subscription[] = [];

    public articulos: Articulo[] = [];

    public categorias: Categoria[] = [];

    public currentCategoria: Categoria | undefined;

    public formArticulos: DynamicDialogRef | undefined;
    public formArticulosEdit: DynamicDialogRef | undefined;

    public constructor(
        private articulosService: ArticulosService,
        private categoriasService: CategoriasService,
        private searchMenuService: SearchMenuService,
        private dialogService: DialogService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    public ngOnInit(): void {
        const sub = this.articulosService.getAll( undefined, undefined ).subscribe({
            next: articulos => {
                this.articulos = articulos;
            }
        });

        const sub1 = this.categoriasService.getAll().subscribe({
            next: categorias => {
                this.categorias = categorias;
            }
        })

        const sub2 = this.searchMenuService.realizarBusqueda().subscribe({
            next: termino => {
                this.buscarByNameOrCategoria( termino, undefined );
            }
        });

        this.subs.push( sub );
        this.subs.push( sub1 );
        this.subs.push( sub2 );
    }

    public OnClickEliminarConfirm( event: Event, id: number ): void {

        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: '¿Estás seguro de que deseas eliminar este artículo?',
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

    public onChangeCategoria(): void {
        console.log( this.currentCategoria );
        if( this.currentCategoria ) {
            this.buscarByNameOrCategoria( undefined, this.currentCategoria.id );
        }
    }

    public onClickAgregar(): void {

        this.formArticulos = this.dialogService.open( FormArticulosComponent, {
            header: 'Agregue un nuevo articulo',
            width: '80%',
            height: '80%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true
        });

        const sub = this.formArticulos.onClose.subscribe({
            next: ( data: Articulo ) => {
                if(!data) return;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Creado',
                    detail: data.nombre
                });
                this.articulos.push( data );
            }
        });

        this.subs.push( sub );
    }

    public onClickEditar( idEditar: number, button: Button ): void {

        button.loading = true;

        const sub = this.articulosService.getById( idEditar ).subscribe({
            next: articulo => {

                this.formArticulosEdit = this.dialogService.open( FormArticulosComponent, {
                    data: {
                        articuloForEdit: articulo
                    },
                    header: 'Editar a '+articulo.nombre,
                    width: '80%',
                    height: '80%',
                    contentStyle: { overflow: 'auto' },
                    baseZIndex: 10000,
                    maximizable: true
                });

                button.loading = false;

                const sub = this.formArticulosEdit.onClose.subscribe({
                    next: ( data: Articulo ) => {
                        if(!data) return;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Editado',
                            detail: data.nombre
                        });
                    }
                });

                this.subs.push( sub );

            }
        })

        this.subs.push( sub )

    }

    public buscarByNameOrCategoria( termino: string | undefined, categoria: number | undefined ) {
        const sub = this.articulosService.getAll( termino, categoria ).subscribe({
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
