import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://10.10.4.198:9090'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  login(userId: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = `userId=${encodeURIComponent(userId)}&password=${encodeURIComponent(password)}`;

    return this.http.post(`${this.baseUrl}/api/login`, body, { headers }).pipe(
      map((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('tokenExpiry', response.expiresIn.toString());
        }
        return response;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');

    if (token && tokenExpiry) {
      const expiryDate = new Date(Number(tokenExpiry));
      return expiryDate > new Date();
    }
    return false;
  }
}
