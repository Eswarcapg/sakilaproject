import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:8081/api/v1/admin/customer';

  constructor(private http: HttpClient) { }

  addCustomer(customerData: any): Observable<any> {
    return this.http.post(`http://localhost:8081/api/v1/admin/customer/post`, customerData);
  }

  getCustomerList() {
    return this.http.get(`${this.apiUrl}/getAll`);
  }
  updateFirstName(customerId: number, payload: any): Observable<any> {
    const url = `${this.apiUrl}/update/fn/${customerId}`;
    return this.http.put(url, payload, { responseType: 'text' });
  }

  updateLastName(customerId: number, payload: any) {
    const url = `${this.apiUrl}/update/ln/${customerId}`;
    return this.http.put(url, payload, { responseType: 'text' });
  }

  updateEmail(customerId: number, payload: any) {
    const url = `${this.apiUrl}/update/email/${customerId}`;
    return this.http.put(url, payload, { responseType: 'text' });
  }

  getActiveCustomers(): Observable<any> {
    const url = `http://localhost:8081/api/v1/admin/customer/active`;
    return this.http.get(url);
  }
}
