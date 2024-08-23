import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProductsComponent } from './pages/products/products.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { ViewProductComponent } from './pages/view-product/view-product.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminProductsComponent } from './pages/admin-products/admin-products.component';
import { AdminCategoryComponent } from './pages/admin-category/admin-category.component';

export const routes: Routes = [
    { path: '', redirectTo: 'hpage', pathMatch: 'full' },
    {path: 'hpage', component: HomepageComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'viewproduct', component: ViewProductComponent},
    {path: 'signin', component: SignInComponent},
    {path: 'login', component: LogInComponent},
    {path: 'admin', component:AdminComponent},
    {path: 'adminProducts', component:AdminProductsComponent},
    {path: 'adminCategory', component:AdminCategoryComponent},
    {path: '**', component: NotFoundComponent}
];
