import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Specialist } from '../../shared/models/specialist.interface';
import { SpecialistService } from '../../shared/specialist.service';
import { Router, RouterModule } from '@angular/router';
import { SpecialistDetailsComponent } from '../specialist-details/specialist-details.component';
import { SpecialistEditComponent } from '../specialist-edit/specialist-edit.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SpecialistDetailsComponent,
    SpecialistEditComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public specialists: Specialist[] = [];
  public selectedSpecialist?: Specialist;

  constructor(
    private specialistService: SpecialistService,
    private router: Router
  ) {}

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

  public onOpenEditModal(): void {
    const container = document.getElementById('navbarNav');

    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    button.setAttribute('data-bs-target', '#updateSpecialistModal');
    container?.appendChild(button);
    button.click();
  }

  refreshSpecialistList() {
    this.getEmployees();
  }

  public deleteSpecialist() {
    const email = localStorage.getItem('email');
    if (email) {
      this.specialistService.deleteSpecialist(email).subscribe({
        next: () => {
          this.logout();
          alert('Succellfully deleted');
          this.router.navigateByUrl('/register');
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  public logout() {
    localStorage.removeItem('email');
    this.specialistService.currentUserSig.set(null);
  }
}
