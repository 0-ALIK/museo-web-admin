import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject( AuthService );
    const router = inject( Router )

    return authService.verificarAuth().pipe(
        map( usuario => {
            if( usuario )
                return true;
            router.navigate(['/auth']);
            return false;
        }),
        catchError((error: any) => {
            router.navigate(['/auth']);
            return of(false);
        })
    );
};
