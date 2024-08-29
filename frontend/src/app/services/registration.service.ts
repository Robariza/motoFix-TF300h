// services/registration.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  // Método para registrar un nuevo usuario
  register(user: { username: string; lastName: string; address: string; phone: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signin`, user).pipe(
      tap(response => {
        console.log('Registro exitoso', response);
      }),
      catchError(error => {
        console.error('Error al registrar', error);
        return of(null); // Retornar un observable vacío en caso de error
      })
    );
  }
}
