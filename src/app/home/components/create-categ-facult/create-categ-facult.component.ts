import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Button } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/models/Categoria';
import { Facultad } from 'src/app/models/Facultad';
import { CategoriasService } from 'src/app/services/categorias.service';
import { FacultadesService } from 'src/app/services/facultades.service';

@Component({
    templateUrl: './create-categ-facult.component.html',
})
export class CreateCategFacultComponent implements OnInit, OnDestroy {

    public subs: Subscription[] = [];

    public value: string | undefined;

    public tipo: string | undefined;

    @ViewChild('boton')
    public boton!: Button

    public constructor(
        private categoriasService: CategoriasService,
        private facultadesService: FacultadesService,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {}

    public ngOnInit(): void {
        this.tipo = this.config.data.tipo;
    }

    public deshabilitado(): boolean {
        if( !this.value || this.value.length < 2 || !this.tipo )
            return true;
        return false;
    }

    public onClickAgregar(): void {
        if( !this.value || this.value.length < 2 || !this.tipo )
            return;

        let sub = new Subscription();

        this.boton.loading = true;

        if( this.tipo === 'categoria' ) {
            const categoria = new Categoria( this.value );
            sub = this.categoriasService.postCategoria( categoria ).subscribe({
                next: categoria => {
                    this.boton.loading = false;
                    this.cerrarDialog( categoria );
                }
            })
        }

        if( this.tipo === 'facultad' ) {
            const facultad = new Facultad( this.value )
            sub = this.facultadesService.postFacultad( facultad ).subscribe({
                next: facultad => {
                    this.boton.loading = false;
                    this.cerrarDialog( facultad );
                }
            });
        }
    }

    public cerrarDialog( dato: Categoria | Facultad ): void {
        this.ref.close( dato );
    }

    public ngOnDestroy(): void {
        if(this.subs.length !== 0)
            this.subs.forEach( sub => sub.unsubscribe() );
    }
}
