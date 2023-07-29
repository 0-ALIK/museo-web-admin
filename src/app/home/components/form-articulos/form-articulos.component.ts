import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUploadEvent } from 'primeng/fileupload';
import { Subscription } from 'rxjs';
import { Articulo } from 'src/app/models/Articulos';
import { Categoria } from 'src/app/models/Categoria';
import { Multimedio } from 'src/app/models/Multimedio';
import { ArticulosService } from 'src/app/services/articulos.service';
import { CategoriasService } from 'src/app/services/categorias.service';


@Component({
    templateUrl: './form-articulos.component.html',
})
export class FormArticulosComponent implements OnInit, OnDestroy {

    public subs: Subscription[] = [];

    public uploadedFiles: File[] = [];

    public currentMultimedios: Multimedio[] = [];

    public label: string = 'Agregar un nuevo artículo';

    public categorias: Categoria[] = [];

    public extenPerminitas: string[] = ['png', 'jpg', 'mp4', 'mp3'];

    public articuloForEdit: Articulo | undefined;

    public articulosBorrarId: number[] = [];

    public form!: FormGroup;

    public constructor(
        private articulosService: ArticulosService,
        private categoriasService: CategoriasService,
        private formBuilder: FormBuilder,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {

    }

    public ngOnInit(): void {
        if( this.config.data && this.config.data.articuloForEdit ) {
            this.articuloForEdit = this.config.data.articuloForEdit;
            this.label = 'Editar artículo';
        }

        if( this.articuloForEdit ) {
            this.currentMultimedios = [ ...this.articuloForEdit.fotos, ...this.articuloForEdit.videos, ...this.articuloForEdit.audios ];
        }

        const sub = this.categoriasService.getAll().subscribe({
            next: categorias => {
                this.categorias = categorias;
            }
        });

        this.form = this.formBuilder.group({ //minLength
            nombre: [ this.articuloForEdit?.nombre || '', [Validators.required, Validators.maxLength(120), Validators.minLength(2)] ],
            dueno: [ this.articuloForEdit?.dueno || '', [Validators.required, Validators.maxLength(120), Validators.minLength(2)] ],
            ubicacion: [ this.articuloForEdit?.ubicacion || '', [Validators.required, Validators.maxLength(255), Validators.minLength(2)] ],
            year: [ this.articuloForEdit?.year || '', [Validators.required, Validators.min(1000)] ],
            categoria: [ null, [Validators.required]],
            descripcion: [ this.articuloForEdit?.descripcion || '' , [Validators.required, Validators.minLength(5)]],
        });

        if( this.articuloForEdit ) {
            const sub2 = this.categoriasService.getAll( this.articuloForEdit.categoria ).subscribe({
                next: categorias => {
                    const firstNameControl: FormControl = this.form.get('categoria') as FormControl;
                    firstNameControl.setValue( categorias[0] );
                }
            });
            this.subs.push( sub2 );
        }

        this.subs.push( sub );
    }

    public error( campo: string, errorType: string ): boolean {
        const field = this.form.get( campo );
        if( field?.errors?.[errorType] && field?.touched ) {
            return true;
        }
        return false;
    }

    public onUpload(event: FileUploadEvent) {
        for(let file of event.files) {
            const partes = file.name.split('.');
            const extension = partes[ partes.length - 1 ].toLowerCase();
            console.log(extension);

            if( this.extenPerminitas.includes( extension ) )
                this.uploadedFiles.push(file);
        }
    }

    public submit( button: Button ): void {

        const articulo = new Articulo();
        articulo.nombre = this.form.get('nombre')?.value;
        articulo.dueno = this.form.get('dueno')?.value;
        articulo.ubicacion = this.form.get('ubicacion')?.value;
        articulo.year = this.form.get('year')?.value;
        articulo.categoria_id = this.form.get('categoria')?.value.id;
        articulo.descripcion = this.form.get('descripcion')?.value;
        articulo.multimedios = this.uploadedFiles;
        articulo.articulosBorrarId = this.articulosBorrarId;

        button.loading = true;

        if( this.articuloForEdit ) {
            const sub = this.articulosService.putArticulo( this.articuloForEdit.id, articulo.getFormData() ).subscribe({
                next: articulo => {
                    button.loading = false;
                    this.cerrarDialog( articulo );
                }
            })
            this.subs.push( sub );

            return;
        }

        const sub = this.articulosService.postArticulo( articulo.getFormData() ).subscribe({
            next: articulo => {
                button.loading = false;
                this.cerrarDialog( articulo );
            }
        });
        this.subs.push( sub );
    }

    public cerrarDialog( dato: Articulo ): void {
        this.ref.close( dato );
    }

    public getNombreUrl( url: string ): string {

        let nombre = '';

        const urlParts = url.split('/');
        const urlPartsEnd = urlParts[ urlParts.length - 1 ];
        const fileNameRaw = urlPartsEnd.split('?')[ 0 ];

        if(fileNameRaw.includes('%')) {
            const fileName = fileNameRaw.split('%')[ fileNameRaw.split('%').length - 1 ];
            nombre = fileName.slice(3).replace(/^\d+/, '');
        } else {
            nombre = fileNameRaw.slice(3).replace(/^\d+/, '');
        }

        if( nombre.length > 10 ) {
            nombre =  nombre.substring( nombre.length - 7 ) + '...';
        }

        return nombre;
    }

    public ngOnDestroy(): void {
        if(this.subs.length !== 0)
            this.subs.forEach( sub => sub.unsubscribe() );
    }


}
