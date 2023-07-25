import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Button } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Carrera } from 'src/app/models/Carrera';
import { Facultad } from 'src/app/models/Facultad';
import { CarrerasService } from 'src/app/services/carreras.service';
import { FacultadesService } from 'src/app/services/facultades.service';

@Component({
    templateUrl: './create-carrera.component.html',
})
export class CreateCarreraComponent implements OnInit, OnDestroy {

    public subs: Subscription[] = [];

    public facultades: Facultad[] = [];

    @ViewChild('boton')
    public boton!: Button

    public selectedFacultad: Facultad | undefined;

    public value: string | undefined;

    public constructor(
        private carrerasService: CarrerasService,
        private facultadesService: FacultadesService,
        public ref: DynamicDialogRef
    ) {}

    public ngOnInit(): void {

        const subFacultades = this.facultadesService.getAll().subscribe({
            next: facultades => {
                this.facultades = facultades;
            }
        });

        this.subs.push( subFacultades );
    }

    public deshabilitado(): boolean {
        if( !this.selectedFacultad || !this.value || this.value.length < 2 )
            return true;
        return false;
    }

    public onClickAgregar(): void {
        if (!this.selectedFacultad || !this.value || this.value.length < 2)
            return;

        this.boton.loading = true;

        const carrera = new Carrera(this.value, this.selectedFacultad?.id);
        const sub = this.carrerasService.postCarrera(carrera).subscribe(carrera => {
            this.boton.loading = false;
            this.cerrarDialog( carrera );
        });

        this.subs.push(sub);
    }

    public cerrarDialog( carrera: Carrera ): void {
        this.ref.close( carrera );
    }

    public ngOnDestroy(): void {
        if(this.subs.length !== 0)
            this.subs.forEach( sub => sub.unsubscribe() );
    }

}
