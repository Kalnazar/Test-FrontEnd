import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Specialist } from './specialist.interface';
import { Observable } from 'rxjs';
import { SpecialistLogin } from './specialistLogin.interface';

@Injectable({
  providedIn: 'root',
})
export class SpecialistService {
  private apiServerUrl = 'http://localhost:8080/api/specialist';
  currentUserSig = signal<Specialist | undefined | null>(undefined);

  constructor(private http: HttpClient) {}

  public getSpecialists(): Observable<Specialist[]> {
    return this.http.get<Specialist[]>(`${this.apiServerUrl}/all`);
  }

  public loginSpecialist(
    specialistLogin: SpecialistLogin
  ): Observable<Specialist> {
    return this.http.post<Specialist>(
      `${this.apiServerUrl}/login`,
      specialistLogin
    );
  }

  public getSpecialistByEmail(email: string): Observable<Specialist> {
    return this.http.get<Specialist>(`${this.apiServerUrl}/find/${email}`);
  }

  public saveSpecialist(specialist: Specialist): Observable<Specialist> {
    return this.http.post<Specialist>(
      `${this.apiServerUrl}/register`,
      specialist
    );
  }

  public updateSpecialist(specialist: Specialist): Observable<Specialist> {
    return this.http.put<Specialist>(`${this.apiServerUrl}/update`, specialist);
  }

  public deleteSpecialist(specialistId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/delete/${specialistId}`
    );
  }
}
