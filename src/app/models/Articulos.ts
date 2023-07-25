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
}
