import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

interface Cliente {
  _id: string; // Usamos _id ya que es el identificador principal
  name: string;
  last_name: string;
  phone: string;
  estado: string;
  fecha_ingreso: string;
  fecha_pagado: string;
  paquete_id: string;
  paquete_descripcion?: string; // Campo adicional para mostrar la descripción del paquete
}

@Injectable({
  providedIn: 'root'
})
export class CuentasService {
  private apiUrl = '/api/customers';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${environment.apiUrl}customers`);
  }

  getCliente(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${environment.apiUrl}customers/${id}`);
  }

  addCliente(cliente: Cliente): Observable<any> {
    return this.http.post(`${environment.apiUrl}customers/create`, cliente);
  }

  updateCliente(id: string, cliente: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}customers/update/${id}`, cliente);
  }
  updatePay(id: string, cliente: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}customers/updatepay/${id}`, cliente);
  }

  deleteCliente(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}customers/delete/${id}`);
  }

  getPaquetes(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}customers/paquetes`);
  }
}
