// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PaquetesService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}paquetes/getAll`);
  }

  addPaquete(paquete: { description: string, cost: number }): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}paquetes/add`, paquete);
  }

  update(paquete: any): Observable<any> {
    if (!paquete._id) {
        throw new Error('El paquete debe tener un _id para ser actualizado.');
      }
      return this.http.put<any>(`${environment.apiUrl}paquetes/update/${paquete._id}`, paquete);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}paquetes/delete/${id}`);
  }


}
