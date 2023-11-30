import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Specialist } from '../../../shared/models/specialist.interface';
import { SpecialistService } from '../../../shared/specialist.service';
import { SpecialistLogin } from '../../../shared/models/specialistLogin.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    senderEmail: new FormControl('', [Validators.required, Validators.email]),
    senderPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private specialistService: SpecialistService,
    private router: Router
  ) {}

  submitForm() {
    const formValue = this.loginForm.getRawValue();
    const specialistLogin: SpecialistLogin = {
      email: formValue.senderEmail!,
      password: formValue.senderPassword!,
    };

    this.specialistService.loginSpecialist(specialistLogin).subscribe({
      next: (response) => {
        localStorage.setItem('email', specialistLogin.email);
        this.specialistService
          .getSpecialistByEmail(specialistLogin.email)
          .subscribe({
            next: (response) => {
              this.specialistService.currentUserSig.set(response);
            },
            error: (error) => {
              alert(error);
            },
          });
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        console.error('Error during registration', error);
      },
    });
  }
}
