import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Specialist } from '../../shared/models/specialist.interface';

@Component({
  selector: 'app-specialist-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './specialist-details.component.html',
})
export class SpecialistDetailsComponent {
  @Input() specialist?: Specialist;

  calculateAge(dateOfBirth: Date | null): number {
    if (!dateOfBirth) {
      return 0;
    }

    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
}
