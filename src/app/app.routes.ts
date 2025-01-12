import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { UserListComponent } from './user-list/user-list.component';
import { authGuard } from './auth.guard';
import { NavbarComponent } from './navbar/navbar.component';

export const routes: Routes = [
  {path: 'navigator', component:NavbarComponent},
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductListComponent, canActivate: [authGuard] },
  { path: 'products/:id', component: ProductDetailsComponent, canActivate: [authGuard] },
  { path: 'add-product', component: AddEditProductComponent, canActivate: [authGuard] },
  { path: 'edit-product/:id', component: AddEditProductComponent, canActivate: [authGuard] },
  { path: 'users', component: UserListComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

