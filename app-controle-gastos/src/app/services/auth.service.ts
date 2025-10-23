import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // ✅ esse é o certo
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(dto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, dto);
  }

  cadastrar(dto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cadastrar`, dto);
  }
}
