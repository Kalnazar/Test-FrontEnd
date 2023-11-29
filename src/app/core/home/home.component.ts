import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Specialist } from '../../shared/specialist.interface';
import { SpecialistService } from '../../shared/specialist.service';
import { SpecialistViewComponent } from '../specialist/specialist-view/specialist-view.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SpecialistViewComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  specialists: Specialist[] = [];

  constructor(private specialistService: SpecialistService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees(): void {
    this.specialistService.getSpecialists().subscribe(
      (response: Specialist[]) => {
        this.specialists = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
