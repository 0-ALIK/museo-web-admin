import { Multimedio } from "./Multimedio";

export class Articulo {
    id!: number;
    nombre!: string;
    descripcion!: string;
    dueno!: string;
    ubicacion!: string;
    year!: number;
    categoria!: string;
    categoria_id!: string;
    multimedios!: File[];
    articulosBorrarId!: number[];
    fotos!: Multimedio[];
    videos!: Multimedio[];
    audios!: Multimedio[];

    public getFormData(): FormData {
        const formData = new FormData();

        formData.append('nombre', this.nombre );
        formData.append('dueno', this.dueno );
        formData.append('ubicacion', this.ubicacion );
        formData.append('year', this.year.toString() );
        formData.append('categoria_id', this.categoria_id)
        formData.append('descripcion', this.descripcion)

        if(this.multimedios && this.multimedios.length !== 0)
            this.multimedios.forEach( file => { formData.append('multimedios', file) });

        if(this.articulosBorrarId && this.articulosBorrarId.length !== 0)
            formData.append('articulosBorrarId', JSON.stringify( this.articulosBorrarId ) );

        return formData;
    }
}
