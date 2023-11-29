import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Specialist } from '../../../shared/specialist.interface';
import { SpecialistDetailsComponent } from '../specialist-details/specialist-details.component';

@Component({
  selector: 'app-specialist-view',
  standalone: true,
  imports: [CommonModule, SpecialistDetailsComponent],
  templateUrl: './specialist-view.component.html',
  styleUrl: './specialist-view.component.css',
})
export class SpecialistViewComponent {
  @Input() specialist!: Specialist;
  public selectedSpecialist: Specialist = this.specialist;

  public loadSpecialistDetails(specialist: Specialist) {
    this.selectedSpecialist = specialist;
  }
}
