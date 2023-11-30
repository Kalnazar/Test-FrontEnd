import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Specialist } from '../../shared/models/specialist.interface';
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
  @Output() specialistUpdated = new EventEmitter<void>();

  public editSpecialist?: Specialist;
  public editForm = new FormGroup({
    senderFullName: new FormControl('', Validators.required),
    senderDate: new FormControl(''),
    senderEducation: new FormControl('', Validators.required),
    senderOccupation: new FormControl(''),
    senderPhoneNumber: new FormControl(''),
    senderLocation: new FormControl(''),
  });

  constructor(private specialistService: SpecialistService) {
    this.getSpecialistByEmail();
  }

  public getSpecialistByEmail() {
    const email = localStorage.getItem('email');

    if (email) {
      this.specialistService.getSpecialistByEmail(email).subscribe({
        next: (specialist) => {
          this.editSpecialist = specialist;
          this.updateForm(specialist);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  private updateForm(specialist: Specialist) {
    this.editForm.patchValue({
      senderFullName: specialist.fullName,
      senderDate: specialist.dateOfBirth
        ? this.formatDate(new Date(specialist.dateOfBirth))
        : null,
      senderEducation: specialist.education,
      senderOccupation: specialist.occupation,
      senderPhoneNumber: specialist.phoneNumber,
    });
  }

  submitForm() {
    const formValue = this.editForm.getRawValue();
    const specialistToSave: Specialist = {
      id: this.editSpecialist!.id,
      fullName: formValue.senderFullName!,
      email: this.editSpecialist!.email,
      dateOfBirth: formValue.senderDate ? new Date(formValue.senderDate) : null,
      location: formValue.senderLocation,
      education: formValue.senderEducation!,
      occupation: formValue.senderOccupation ?? null,
      professionalSkills: this.editSpecialist!.professionalSkills,
      phoneNumber: formValue.senderPhoneNumber ?? null,
      password: this.editSpecialist!.password,
    };
    console.log(specialistToSave);

    this.specialistService.updateSpecialist(specialistToSave).subscribe({
      next: (specialist) => {
        console.log('Specialist was successfully updated');
        this.specialistUpdated.emit();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  private formatDate(date: Date): string {
    return date.toISOString();
  }
}
