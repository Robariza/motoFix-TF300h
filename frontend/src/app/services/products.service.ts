import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Product } from '../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'http://localhost:3000/product'; 

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getProducts(): Observable<Product[]> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<Product[]>(`${this.apiUrl}`, { headers })
      .pipe(
        catchError(this.handleError<Product[]>('getProducts', []))
      );
  }

  // Obtener un producto por ID
  getProductById(id: string): Observable<Product> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<Product>(`${this.apiUrl}/${id}`, { headers })
      .pipe(
        catchError(this.handleError<Product>('getProductById'))
      );
  }

  // Crear un nuevo producto
  createProduct(product: Product): Observable<Product> {
    const headers = this.createAuthorizationHeader();
    return this.http.post<Product>(`${this.apiUrl}`, product, { headers })
      .pipe(
        catchError(this.handleError<Product>('createProduct'))
      );
  }

  // Actualizar un producto por ID
  updateProductById(id: string, product: Product): Observable<Product> {
    const headers = this.createAuthorizationHeader();
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product, { headers })
      .pipe(
        catchError(this.handleError<Product>('updateProductById'))
      );
  }

  // Eliminar un producto por ID
  deleteProductById(id: string): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers })
      .pipe(
        catchError(this.handleError<any>('deleteProductById'))
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
