import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CuentasService } from './cuentas.service'; // Asegúrate de que la ruta es correcta
import { AlertService } from 'src/app/alertas/alertas.service';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.scss'] // Asegúrate de que la ruta es correcta
})
export class CuentasComponent implements OnInit {
  clientes: any[] = [];
  clienteSeleccionado: any = {};
  paquetes: any[] = [];
  editar: boolean = false;
  mostrarFormulario: boolean = false; // Variable para controlar la visibilidad del formulario

  constructor(private cuentasService: CuentasService, private fb: FormBuilder, private alertService: AlertService) {}

  ngOnInit(): void {
    this.getClientes();
    this.getPaquetes();
  }

  getClientes() {
    this.cuentasService.getClientes().subscribe((data: any[]) => {
      this.clientes = data;
    });
  }

  getPaquetes() {
    this.cuentasService.getPaquetes().subscribe((data: any[]) => {
      this.paquetes = data;
    });
  }

  openForm(cliente?: any) {
    if (cliente) {
      this.clienteSeleccionado = { ...cliente };
      this.editar = true;
    } else {
      this.clienteSeleccionado = {};
      this.editar = false;
    }
    this.mostrarFormulario = true; // Muestra el formulario
  }

  saveCliente() {
    if (this.editar) {
      this.cuentasService.updateCliente(this.clienteSeleccionado._id, this.clienteSeleccionado).subscribe(() => {
        this.getClientes();
        this.resetForm();
        this.alertService.showSuccess('Cliente actualizado con éxito');
      });
    } else {
      this.cuentasService.addCliente(this.clienteSeleccionado).subscribe(() => {
        this.getClientes();
        this.resetForm();
        this.alertService.showSuccess('Cliente agregado con éxito');
      });
    }
  }

  deleteCliente(cliente: any) {
    this.cuentasService.deleteCliente(cliente._id).subscribe(() => {
      this.getClientes();
      this.alertService.showSuccess('Cliente eliminado con éxito');
    });
  }

  markAsPaid(cliente: any) {
    if (cliente._id) {
      // Convertir fecha_ingreso a un objeto de fecha (Date)
      const fechaIngreso = new Date(cliente.fecha_ingreso);
  
      // Obtener el día y el mes de la fecha de ingreso
      const diaIngreso = fechaIngreso.getDate();
      const mesIngreso = fechaIngreso.getMonth();
      const añoIngreso = fechaIngreso.getFullYear();
  
      // Calcular la próxima fecha de pago sumando un mes
      const nextPaymentDate = new Date(añoIngreso, mesIngreso + 1, diaIngreso);
      const formattedNextPaymentDate = nextPaymentDate.toISOString().split('T')[0];
      console.log(formattedNextPaymentDate);
  
      // Actualizar la fecha de pago a hoy y la fecha del próximo pago
      cliente.fecha_pagado = new Date().toISOString().split('T')[0];
      cliente.fecha_proximo_pago = formattedNextPaymentDate;
  
      this.cuentasService.updatePay(cliente._id, cliente).subscribe(() => {
        this.getClientes();
        this.alertService.showSuccess('Cliente marcado como pagado con éxito');
      });
    }
  }
  

  getDescripcionPaquete(paquete_id: string): string {
    const paquete = this.paquetes.find(p => p._id === paquete_id);
    return paquete ? paquete.descripcion : 'No disponible';
  }

  cancelarEdicion() {
    this.resetForm(); // Llama a resetForm para cancelar la edición
  }

  resetForm() {
    this.clienteSeleccionado = {};
    this.editar = false;
    this.mostrarFormulario = false; // Oculta el formulario
  }
}
