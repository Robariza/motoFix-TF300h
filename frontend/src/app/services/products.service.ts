import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';
import { Product } from '../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'http://localhost:3000/product';

  constructor(private httpClient : HttpClient) { }

  // Obtener productos
  public getProducts(): Observable<Product[]> {
    // Realiza una solicitud HTTP GET a la URL definida en this.apiUrl
    return this.httpClient.get<Product[]>(this.apiUrl).pipe(
      // Maneja cualquier error que ocurra durante la solicitud HTTP
      catchError(error => {
        // Imprime el error en la consola
        console.error('Error al obtener productos', error);
        // Retorna un Observable que emite un array vacío en lugar del error
        return of([]);
      })
    );
  }

  // Obtener un producto por ID
  getProductById(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error al obtener el producto indicado', error);
        return of({} as Product);
      })
    );
  }

  // Crear un nuevo producto
  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.apiUrl, product).pipe(
      catchError(error => {
        console.error('Error al crear producto', error);
        return of({} as Product);
      })
    );
  }

  // Actualizar un producto por ID
  updateProductById(id: string, product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.apiUrl}/${id}`, product).pipe(
      catchError(error => {
        console.error('Error al actualizar el producto indicado', error);
        return of({} as Product);
      })
    );
  }

  // Eliminar un producto por ID
  deleteProductById(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar el producto indicado', error);
        return of(); 
      })
    );
  }
}
