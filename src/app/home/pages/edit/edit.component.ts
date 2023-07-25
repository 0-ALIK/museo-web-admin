import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: [
  ]
})
export class EditComponent {

    public constructor (
        private activatedRoute: ActivatedRoute
    ) {

        this.activatedRoute.params.subscribe({
            next: ({tipo, id}) => {
                console.log(tipo, id);
            }
        })
    }

}
