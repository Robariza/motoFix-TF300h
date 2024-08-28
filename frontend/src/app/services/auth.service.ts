import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private tokenSubject = new BehaviorSubject<string | null>(null); // Para gestionar el estado del token
  public token$ = this.tokenSubject.asObservable(); // Observable para que otros componentes se suscriban al token

  constructor(private http: HttpClient) { }

  // Función para iniciar sesión
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem('authToken', response.token);
            this.tokenSubject.next(response.token);
          }
        }),
        catchError(error => {
          // Manejar el error aquí
          console.error('Login error', error);
          return of(null); // Retornar un observable vacío en caso de error
        })
      );
  }

  // Función para cerrar sesión
  logout() {
    localStorage.removeItem('authToken'); // Elimina el token de localStorage
    this.tokenSubject.next(null); // Actualiza el tokenSubject a null
  }

  // Función para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken'); // Devuelve true si hay un token en localStorage
  }
}