import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SpecialistService } from '../../../shared/specialist.service';
import { Specialist } from '../../../shared/specialist.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  public registerForm = new FormGroup({
    sendFullName: new FormControl('', Validators.required),
    senderEmail: new FormControl('', [Validators.required, Validators.email]),
    sendEducation: new FormControl('', Validators.required),
    sendOccupation: new FormControl(''),
    sendPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private specialistService: SpecialistService,
    private router: Router
  ) {}

  submitForm() {
    const formValue = this.registerForm.getRawValue();
    const specialistToSave: Specialist = {
      fullName: formValue.sendFullName!,
      email: formValue.senderEmail!,
      dateOfBirth: null,
      location: null,
      education: formValue.sendEducation!,
      occupation: formValue.sendOccupation,
      professionalSkills: null,
      phoneNumber: null,
      password: formValue.sendPassword!,
    };
    console.log(specialistToSave);

    this.specialistService.saveSpecialist(specialistToSave).subscribe({
      next: (response) => {
        localStorage.setItem('email', response.email);
        this.specialistService.currentUserSig.set(response);
        this.router.navigateByUrl('/');
        console.log('Specialist registered successfully', response);
      },
      error: (error) => {
        console.error('Error during registration', error);
      },
    });
  }
}
