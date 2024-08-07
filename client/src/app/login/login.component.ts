import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null | undefined = null;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        if (response.success) {
          localStorage.setItem('token', response.token!);
          this.router.navigate(['/customers']); // Redirige al componente de clientes
        } else {
          this.errorMessage = response.message || 'An unexpected error occurred';
        }
      },
      error => {
        this.errorMessage = 'Contraseña Incorrecta. Intentelo de nuevo.';
      }
    );
  }
}
