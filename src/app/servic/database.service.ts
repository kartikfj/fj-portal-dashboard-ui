import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private apiUrl = 'http://10.10.4.198:9090/fjtcouser'; // Update with your actual API URL

  constructor(private http: HttpClient) { }

  getTables(searchTerm: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/tables?search=${searchTerm}`);
  }

  getTableNames():Observable<string[]>{
    return this.http.get<string[]>(`${this.apiUrl}/tables`);
  }
  getTableColumns(tableName:string):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/tables/${tableName}/columns`)
  }
  getTableData(tableName:string):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/tables/${tableName}/data`);
  }
  getUserData(tableName: string, userId: string): Observable<any[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<any[]>(`${this.apiUrl}/tables/${tableName}/user`, { params });
  }
}
