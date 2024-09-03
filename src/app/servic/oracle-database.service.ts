import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OracleDatabaseService {
  private baseUrl = 'http://localhost:9090/oracle'; // Update with your backend URL

  constructor(private http: HttpClient) { }
    // Get all tables with an optional search term
    getTables(searchTerm?: string): Observable<string[]> {
      let params = new HttpParams();
      if (searchTerm) {
        params = params.set('searchTerm', searchTerm);
      }
      return this.http.get<string[]>(`${this.baseUrl}/tables`, { params });
    }
    getColumns(tableName: string): Observable<string[]> {
      return this.http.get<string[]>(`${this.baseUrl}/columns`, {
        params: new HttpParams().set('tableName', tableName)
      });
    }

     // Get all data from a specific table
  getTableData(tableName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/table-data`, {
      params: new HttpParams().set('tableName', tableName)
    });
  }

  // Get column information for a specific table
  getTableColumns(tableName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/table-columns`, {
      params: new HttpParams().set('tableName', tableName)
    });
  }
}
