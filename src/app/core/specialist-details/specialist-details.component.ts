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
}
