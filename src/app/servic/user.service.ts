import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://10.10.4.198:9090'; // Your API URL

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    });
    return this.http.get<any[]>(`${this.apiUrl}/fjtcouser/all`,{headers});
  }

  getUserById(userId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    });
    return this.http.get<any>(`${this.apiUrl}/fjtcouser/${userId}`,{headers});
  }

  updatePassword(userId: string, newPassword: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/fjtcouser/${userId}/password`, null, {
      params: { newPassword }
    });
  }

}
