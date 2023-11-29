import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Specialist } from '../../shared/specialist.interface';
import { SpecialistService } from '../../shared/specialist.service';
import { RouterModule } from '@angular/router';
import { SpecialistDetailsComponent } from '../specialist/specialist-details/specialist-details.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, SpecialistDetailsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public specialists: Specialist[] = [];
  public selectedSpecialist?: Specialist;

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

  public onOpenModal(employee: Specialist): void {
    this.selectedSpecialist = employee;

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    button.setAttribute('data-bs-target', '#specialistDetailsModal');
    container?.appendChild(button);
    button.click();
  }

  public logout() {
    localStorage.setItem('email', '');
    this.specialistService.currentUserSig.set(null);
  }
}
