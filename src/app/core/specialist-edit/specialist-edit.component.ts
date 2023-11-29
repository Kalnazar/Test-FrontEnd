import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Specialist } from '../../shared/specialist.interface';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SpecialistService } from '../../shared/specialist.service';

@Component({
  selector: 'app-specialist-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './specialist-edit.component.html',
  styles: ``,
})
export class SpecialistEditComponent {
  public editSpecialist?: Specialist;
  public editForm = new FormGroup({
    sendFullName: new FormControl('', Validators.required),
    senderEmail: new FormControl('', [Validators.required, Validators.email]),
    sendEducation: new FormControl('', Validators.required),
    sendOccupation: new FormControl(''),
  });

  constructor(private specialistService: SpecialistService) {
    this.getSpecialistByEmail();
  }

  public getSpecialistByEmail() {
    const email = localStorage.getItem('email');

    if (email) {
      this.specialistService.getSpecialistByEmail(email).subscribe({
        next: (response) => {
          this.editSpecialist = response;
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  submitForm() {}
}
