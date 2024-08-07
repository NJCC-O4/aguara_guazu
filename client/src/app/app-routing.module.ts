import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers/customers.component';

const routes: Routes = [
  { path: '', redirectTo: 'app/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'customers', component: CustomersComponent },
  // Añade otras rutas aquí
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
