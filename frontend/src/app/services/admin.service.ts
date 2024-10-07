import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://137.184.16.192:3000/admin';

  constructor(private http: HttpClient) { }

  // Obtener todos los elementos
  getAllItems(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(this.apiUrl, { headers })
      .pipe(
        catchError(this.handleError<any>('getAllItems'))
      );
  }

  // Crear un nuevo elemento
  createItem(item: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, item, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(this.handleError<any>('createItem'))
      );
  }

  // Eliminar un elemento por ID
  deleteItemById(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(this.handleError<any>('deleteItemById'))
      );
  }

  // Actualizar un elemento por ID
  updateItemById(id: string, item: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.apiUrl}/${id}`, item, { headers })
      .pipe(
        catchError(this.handleError<any>('updateItemById'))
      );
  }

  // Obtener encabezados con token de autorización
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // Manejo de errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} Error: ${error.message}`);
      return of(result as T);
    };
  }
}
