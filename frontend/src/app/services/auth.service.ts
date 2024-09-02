import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, tap, catchError } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private roleSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.tokenSubject.next(token);
      this.setUserRoleFromToken(token);
    }
  }

  login(password: string, email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { password, email })
      .pipe(
        tap(response => {
          const token = response.token;
          this.tokenSubject.next(token);
          localStorage.setItem('token', token);
          this.setUserRoleFromToken(token);
        }),
        catchError(error => {
          console.error('Error al iniciar sesión', error);
          return of(null);
        })
      );
  }

  getToken(): Observable<string | null> {
    const token = localStorage.getItem('token');
    return of(token);
  }


  getUserRole(): Observable<string | null> {
    return this.roleSubject.asObservable();
  }

  private setUserRoleFromToken(token: string): void {
    try {
      const decoded: any = jwtDecode(token);
      const role = decoded.role || null;
      this.roleSubject.next(role);
    } catch (error) {
      console.error('Error decodificando el token', error);
      this.roleSubject.next(null);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.roleSubject.next(null);
  }
}