import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-ver',
    templateUrl: './ver.component.html'
})
export class VerComponent implements OnInit {

    public tipo!: string;

    public constructor (
        private activatedRoute: ActivatedRoute
    ) { }

    public ngOnInit(): void {
        this.activatedRoute.params.subscribe({
            next: ({tipo}) => {
                this.tipo = tipo
            }
        });
    }

}
