import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Customer, CustomerInput } from '../models/customer.model';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5063/api/Customer';

  getAll(): Promise<Customer[]> { return firstValueFrom(this.http.get<Customer[]>(this.apiUrl)); }
  create(customer: CustomerInput): Promise<Customer> { return firstValueFrom(this.http.post<Customer>(this.apiUrl, customer)); }
  update(id: number, customer: CustomerInput): Promise<void> { return firstValueFrom(this.http.put<void>(`${this.apiUrl}/${id}`, { ...customer, id })); }
  remove(id: number): Promise<void> { return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`)); }

  getErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof HttpErrorResponse) {
      const details = error.error?.title || error.error?.message || error.error?.detail;
      return details || `Request failed with status ${error.status}`;
    }
    return fallback;
  }
}
