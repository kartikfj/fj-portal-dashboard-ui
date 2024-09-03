import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://10.10.4.198:9090'; // Replace with your backend URL
  private sessionTimeout: any;

  constructor(private http: HttpClient, private router: Router) {}

  login(userId: string, password: string): Observable<any> {
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = `userId=${encodeURIComponent(userId)}&password=${encodeURIComponent(password)}`;

    return this.http.post(`${this.baseUrl}/api/login`, body, { headers }).pipe(
      map((response: any) => {
       
        if (response.token) {

          localStorage.setItem('token', response.token);
          localStorage.setItem('tokenExpiry', response.expiresIn.toString());
          const currentTime = Date.now(); // Current time in milliseconds
          const expiryTime = currentTime + response.expiresIn; // expiresIn is in milliseconds (e.g., 3600000 for 1 hour)
  
          this.startSessionTimer(expiryTime);
        }
        return response;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    clearTimeout(this.sessionTimeout);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');

  //   if (token && tokenExpiry) {
  //     const expiryDate = new Date(Number(tokenExpiry));
  //     return expiryDate > new Date();
  //   }
  //   return false;
  // }
  if (token && tokenExpiry) {
    const expiryDate = new Date(Number(tokenExpiry));
    if (expiryDate > new Date()) {
      this.startSessionTimer(Number(tokenExpiry) - Date.now()); // Restart session timer on refresh
      return true;
    } else {
      this.logout(); // Automatically logout if the token has expired
      return false;
    }
  }
  return false;
}

private startSessionTimer(expiryTime: number): void {
  const expiresIn = expiryTime - Date.now();
  if (expiresIn > 0) {
    this.sessionTimeout = setTimeout(() => {
      this.logout();
    }, expiresIn);
  } else {
    this.logout(); // Immediately logout if the time has already passed
  }
}
}
