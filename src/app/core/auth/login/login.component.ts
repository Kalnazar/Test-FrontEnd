import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Specialist } from '../../../shared/specialist.interface';
import { SpecialistService } from '../../../shared/specialist.service';

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

  constructor(private specialistService: SpecialistService) {}

  submitForm() {
    const formValue = this.loginForm.getRawValue();
    const specialistLogin = {
      email: formValue.senderEmail,
      password: formValue.senderPassword,
    };
  }
}
