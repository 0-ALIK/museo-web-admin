import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Carrera } from 'src/app/models/Carrera';
import { Facultad } from 'src/app/models/Facultad';
import { CreateCarreraComponent } from "../create-carrera/create-carrera.component";
import { CarrerasService } from 'src/app/services/carreras.service';
import { FacultadesService } from 'src/app/services/facultades.service';
import { SearchMenuService } from 'src/app/services/search-menu.service';

@Component({
  selector: 'app-carreras-table',
  templateUrl: './carreras-table.component.html',
  providers: [ DialogService, MessageService ]
})
export class CarrerasTableComponent implements OnInit, OnDestroy {

    public subs: Subscription[] = [];

    public carreras: Carrera[] = [];

    public facultades: Facultad[] = [];

    public selectedFacultad: Facultad | undefined;

    public facultad_id: number = 1;

    public createCarreraRef: DynamicDialogRef | undefined;

    public constructor (
        private carrerasService: CarrerasService,
        private facultadesService: FacultadesService,
        private searchMenuService: SearchMenuService,
        private messageService: MessageService,
        private dialogService: DialogService
        ) {}

    public ngOnInit(): void {

        const subFacultades = this.facultadesService.getAll().subscribe({
            next: facultades => {
                this.facultades = facultades;
            }
        });

        const subSearchMenu = this.searchMenuService.realizarBusqueda().subscribe({
            next: termino => {
                this.buscarCarrerasByName( termino );
            }
        });

        this.subs.push( subFacultades );
        this.subs.push( subSearchMenu );
    }

    private buscarCarrerasByName( termino: string ): void {
        const sub = this.carrerasService.getAll( termino ).subscribe({
            next: carreras => {
                this.carreras = carreras;
            }
        });

        this.subs.push( sub );
    }

    public onChangeFacultades(): void {
        if( !this.selectedFacultad )
            return;
        const sub = this.carrerasService.getAllByFacultad( this.selectedFacultad.id ).subscribe({
            next: carreras => {
                this.carreras = carreras
            }
        })

        this.subs.push( sub );
    }

    public OnClickEliminar( id: number, button: Button ): void {

        button.loading = true;

        const sub = this.carrerasService.deleteCarrera( id ).subscribe({
            next: carreraRes => {
                this.carreras = this.carreras.filter( carrera => carrera.id !== carreraRes.id );
                this.messageService.add({
                    severity: 'success',
                    summary: 'Borrado',
                    detail: carreraRes.nombre
                });
                button.loading = false;
            }
        })

        this.subs.push( sub );
    }

    public onClickAgregar(): void {

        this.createCarreraRef = this.dialogService.open( CreateCarreraComponent, {
            header: 'Agregue una nueva carrera',
            width: '70%',
            height: '70%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true
        });

        this.createCarreraRef.onClose.subscribe({
            next: (carrera: Carrera) => {
                if(!carrera) return;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Creado',
                    detail: carrera.nombre
                });
            }
        });
    }

    public ngOnDestroy(): void {
        if(this.subs.length !== 0)
            this.subs.forEach( sub => sub.unsubscribe() );
    }

}
