import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private apiUrl = 'http://10.10.4.198:9090/fjtcouser'; // Update with your actual API URL

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getTables(searchTerm: string): Observable<string[]> {
    //const headers = this.getAuthHeaders();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    });
    return this.http.get<string[]>(`${this.apiUrl}/tables?search=${searchTerm}`,{headers});
  }

  getTableNames(): Observable<string[]> {
   // const headers = this.getAuthHeaders();
   const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  });
    return this.http.get<string[]>(`${this.apiUrl}/tables`,{headers});
  }

  getTableColumns(tableName: string): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/tables/${tableName}/columns`, { headers });
  }

  getTableData(tableName: string): Observable<any[]> {
   // const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/tables/${tableName}/data`);
  }

  getUserData(tableName: string, userId: string): Observable<any[]> {
    const headers = this.getAuthHeaders();
    const params = new HttpParams().set('userId', userId);
    return this.http.get<any[]>(`${this.apiUrl}/tables/${tableName}/user`, { headers, params });
  }
}
