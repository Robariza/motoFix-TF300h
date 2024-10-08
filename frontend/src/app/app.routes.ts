// Guards, routes
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
// Components
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProductsComponent } from './pages/products/products.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { ViewProductComponent } from './pages/view-product/view-product.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminProductsComponent } from './pages/admin-products/admin-products.component';
import { AdminCategoryComponent } from './pages/admin-category/admin-category.component';
import { UsersComponent } from './pages/users/users.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [

    { path: 'hpage', component: HomepageComponent },
    { path: '', redirectTo: 'hpage', pathMatch: 'full' },
    { path: 'product', component: ProductsComponent },
    { path: 'product/:id', component: ViewProductComponent },
    { path: 'signin', component: SignInComponent },
    { path: 'login', component: LogInComponent },
    { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
    { path: 'adminProducts', component: AdminProductsComponent, canActivate: [authGuard] },
    { path: 'adminCategory', component: AdminCategoryComponent, canActivate: [authGuard] },
    { path: 'userManagement', component: UsersComponent, canActivate: [authGuard] },
    { path: 'userProfile', component: UserProfileComponent },
    { path: 'cart', component: CartComponent },
    { path: '**', component: NotFoundComponent }

];
