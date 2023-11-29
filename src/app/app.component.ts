import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SpecialistViewComponent } from './specialist/specialist-view/specialist-view.component';
import { Specialist } from './shared/specialist.interface';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { SpecialistService } from './shared/specialist.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SpecialistViewComponent,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
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
