import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of, tap, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private tokenSubject = new BehaviorSubject<string | null>(null); // Gestiona el estado del token

  constructor(public http: HttpClient) { }

  // Envia la solicitud de inicio de sesión al backend y, si es exitosa, almacena el token en el tokenSubject y en el almacenamiento localStorage del navegador
  public login(mail: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { mail, password })
      .pipe(
        tap(response => {
          this.tokenSubject.next(response.token);
          localStorage.setItem('token', response.token);
        }),
        catchError(error => {
          console.error('Login error', error);
          return of(null); // Retornar un observable vacío en caso de error
        })
      );
  }

  // Verifica el token con el backend
  verifyToken(token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/verify`, { headers });
  }

  // Devuelve un observable con el token actual
  public getToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  // Función para cerrar sesión
  logout() {
    localStorage.removeItem('authToken'); // Elimina el token de localStorage
    this.tokenSubject.next(null); // Actualiza el tokenSubject a null
  }
}