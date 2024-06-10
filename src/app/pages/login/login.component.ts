import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  handleSubmit() {
    this.authService.login(this.registerForm.value).subscribe({
      next: (data) => {
        console.log(data);
        localStorage.setItem(
          'token',
          (data as { accessToken: string }).accessToken
        );
        alert('OK');
        this.router.navigate(['/admin/products/list']);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
