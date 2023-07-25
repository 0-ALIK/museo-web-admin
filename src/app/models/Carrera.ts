export class Carrera {
    id!: number;
    nombre!: string;
    facultad!: string;
    facultad_id!: number;

    public constructor(nombre: string, facultad_id: number) {
        this.nombre = nombre;
        this.facultad_id = facultad_id;
    }

}
