import { Component, OnInit } from '@angular/core';
import { PaquetesService } from './paquetes.service';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.scss']
})
export class PaquetesComponent implements OnInit {
  paquetes: any[] = [];
  paquete: any = { _id: '', descripcion: '', costo: 0 };
  editing: boolean = false;
  alertMessage: string = '';
  alertType: string = ''; // 'success' or 'error'

  constructor(private paquetesService: PaquetesService) { }

  ngOnInit(): void {
    this.loadPaquetes();
  }

  loadPaquetes(): void {
    this.paquetesService.getAll().subscribe(data => {
      this.paquetes = data;
    });
  }

  addPaquete(): void {
    if (!this.paquete.descripcion || this.paquete.costo <= 0) {
      this.showAlert('error', 'Por favor complete todos los campos.');
      return;
    }
    this.paquetesService.addPaquete(this.paquete).subscribe(() => {
      this.showAlert('success', 'Paquete agregado con éxito.');
      this.loadPaquetes();
      this.resetForm();
    }, () => {
      this.showAlert('error', 'Error al agregar el paquete.');
    });
  }

  editPaquete(paquete: any): void {
    this.paquete = { ...paquete };
    this.editing = true;
  }

  updatePaquete(): void {
    if (!this.paquete._id || !this.paquete.descripcion || this.paquete.costo <= 0) {
      this.showAlert('error', 'Por favor complete todos los campos y asegúrese de que el paquete tenga un _id.');
      return;
    }
    this.paquetesService.update(this.paquete).subscribe(() => {
      this.showAlert('success', 'Paquete actualizado con éxito.');
      this.loadPaquetes();
      this.resetForm();
      this.editing = false;
    }, () => {
      this.showAlert('error', 'Error al actualizar el paquete.');
    });
  }

  deletePaquete(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este paquete?')) {
      this.paquetesService.delete(id).subscribe(() => {
        this.showAlert('success', 'Paquete eliminado con éxito.');
        this.loadPaquetes();
      }, () => {
        this.showAlert('error', 'Error al eliminar el paquete.');
      });
    }
  }

  resetForm(): void {
    this.paquete = { _id: '', descripcion: '', costo: 0 };
  }

  showAlert(type: string, message: string): void {
    this.alertType = type;
    this.alertMessage = message;
    setTimeout(() => {
      this.alertMessage = '';
    }, 5000); // La alerta durará 5000 ms
  }
}
