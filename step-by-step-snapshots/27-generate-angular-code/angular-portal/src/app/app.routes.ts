import { Routes } from '@angular/router';
import { UserRegistrationComponent } from './user-registration.component';

export const routes: Routes = [
	{ path: 'register', component: UserRegistrationComponent },
	{ path: '', redirectTo: '/register', pathMatch: 'full' },
	{ path: '**', redirectTo: '/register' }
];
