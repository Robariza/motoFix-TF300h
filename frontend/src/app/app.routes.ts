import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProductsComponent } from './pages/products/products.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { LogInComponent } from './pages/log-in/log-in.component';

export const routes: Routes = [
    {path: 'hpage', component: HomepageComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'signin', component: SignInComponent},
    {path: 'login', component: LogInComponent},
    {path: '**', component: NotFoundComponent},
];
