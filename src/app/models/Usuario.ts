export class Usuario {
    id!: number;
    nombre_usuario!: string;
    id_usuario!: number;
    rol!: string;
    nombre!: string;
    apellido!: string;
    cedula!: string;
    nivel!: number;
    facultad!: string;
    carrera!: string;
    foto!: string | File;

    id_facultad!: number;
    id_carrera!: number;
}
