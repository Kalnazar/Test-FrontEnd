import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Specialist } from './specialist.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpecialistService {
  private apiServerUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  public getSpecialists(): Observable<Specialist[]> {
    return this.http.get<Specialist[]>(`${this.apiServerUrl}/specialist/all`);
  }

  public getSpecialistByEmail(email: string): Observable<Specialist> {
    return this.http.get<Specialist>(
      `${this.apiServerUrl}/specialist/find/${email}`
    );
  }

  public saveSpecialist(employee: Specialist): Observable<Specialist> {
    return this.http.post<Specialist>(
      `${this.apiServerUrl}/specialist/register`,
      employee
    );
  }

  public updateSpecialist(employee: Specialist): Observable<Specialist> {
    return this.http.put<Specialist>(
      `${this.apiServerUrl}/specialist/update`,
      employee
    );
  }

  public deleteSpecialist(employeeId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/specialist/delete/${employeeId}`
    );
  }
}
