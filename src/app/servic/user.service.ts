import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://10.10.4.198:9090'; // Your API URL

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/fjtcouser/all`);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/fjtcouser/${userId}`);
  }

  updatePassword(userId: string, newPassword: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/fjtcouser/${userId}/password`, null, {
      params: { newPassword }
    });
  }

}
