import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://137.184.16.192:3000/user';

  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios
  getUsers(): Observable<User[]> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<User[]>(this.apiUrl, { headers })
      .pipe(
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  // Obtener un usuario por ID
  getUserById(id: string): Observable<User> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<User>(`${this.apiUrl}/${id}`, { headers })
      .pipe(
        catchError(this.handleError<User>(`getUserById id=${id}`))
      );
  }

  // Crear un nuevo usuario
  createUser(user: User): Observable<User> {
    const headers = this.createAuthorizationHeader();
    return this.http.post<User>(this.apiUrl, user, { headers })
      .pipe(
        catchError(this.handleError<User>('createUser'))
      );
  }

  // Actualizar un usuario por ID
  updateUser(id: string, user: User): Observable<User> {
    const headers = this.createAuthorizationHeader();
    return this.http.put<User>(`${this.apiUrl}/${id}`, user, { headers })
      .pipe(
        catchError(this.handleError<User>('updateUser'))
      );
  }

  // Eliminar un usuario por ID
  deleteUser(id: string): Observable<void> {
    const headers = this.createAuthorizationHeader();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers })
      .pipe(
        catchError(this.handleError<void>('deleteUser'))
      );
  }

  // Método para obtener el perfil del usuario autenticado
  getUserProfile(): Observable<User> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<User>(`${this.apiUrl}/profile`, { headers })
      .pipe(
        catchError(this.handleError<User>('getUserProfile'))
      );
  }

  // Crear encabezados con token de autorización
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }

  // Manejo de errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} Error: ${error.message}`);
      return of(result as T);
    };
  }

}