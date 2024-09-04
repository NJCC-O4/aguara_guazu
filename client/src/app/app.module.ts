import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { CustomersComponent } from './customers/customers/customers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'; // Importa MatTableModule
import { MatCardModule } from '@angular/material/card';
import { PaquetesComponent } from './paquetes/paquetes/paquetes.component';
import { CuentasComponent } from './cuentas/cuentas/cuentas.component';
//import { FuseAlertService, FuseAlertType } from '@fuse/components/alert';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CustomersComponent,
    PaquetesComponent,
    CuentasComponent // Asegúrate de que LoginComponent esté aquí
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTableModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
