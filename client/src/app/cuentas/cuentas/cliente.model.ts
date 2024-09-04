export interface Cliente {
  _id: string;  // Cambiado de 'id' a '_id'
  name: string;
  last_name: string;
  phone: string;
  estado: string;
  fecha_ingreso: string;
  fecha_pagado: string;
  paquete_id: string;
  paquete_descripcion?: string; // Campo adicional para mostrar la descripción del paquete
}
