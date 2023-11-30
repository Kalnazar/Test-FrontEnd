import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Specialist } from './models/specialist.interface';
import { Observable } from 'rxjs';
import { SpecialistLogin } from './models/specialistLogin.interface';
import { SpecialistRegister } from './models/specialistRegister.interface';

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

  public saveSpecialist(
    specialist: SpecialistRegister
  ): Observable<Specialist> {
    return this.http.post<Specialist>(
      `${this.apiServerUrl}/register`,
      specialist
    );
  }

  public updateSpecialist(specialist: Specialist): Observable<Specialist> {
    return this.http.put<Specialist>(`${this.apiServerUrl}/update`, specialist);
  }

  public deleteSpecialist(specialistEmail: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/delete/${specialistEmail}`
    );
  }
}
