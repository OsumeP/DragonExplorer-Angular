import { Routes } from '@angular/router';
import { ListComponent } from './domains/characters/pages/list/list.component';
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        component:ListComponent,
    },
    {
        path: 'list',
        component: ListComponent,
    },
    {
        path: '**',
        component: NotFoundComponent,
    }
];
