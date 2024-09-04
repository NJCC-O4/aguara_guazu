import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {
  currentTab: string = 'profile'; // Pestaña seleccionada por defecto
  selectedCategory: string = '';
  searchQuery: string = '';
  dateRangeStart: string = '';
  dateRangeEnd: string = '';
  categories: string[] = ['Category 1', 'Category 2', 'Category 3'];
  dataSource: any[] = []; // Tu fuente de datos
  displayedColumns: string[] = ['column1'];



  


  constructor(private router: Router) {}

  selectTab(tab: string) {
    this.currentTab = tab;
  }


  
  logout() {
    // Aquí puedes añadir lógica para limpiar la sesión, si es necesario
    // Por ejemplo, eliminar tokens de autenticación

    // Redirigir a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
}
