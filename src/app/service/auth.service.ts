// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment?.baseUrl; // Replace with your API URL

  constructor(private http: HttpClient) { }

  validateToken(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/validate-token`, { headers });
  }

  getProfile(token: string | null): Observable<any> {
    if (!token) {
      throw new Error("Token is null or undefined");
    }
  
    const headers = new HttpHeaders().set('x-access-token', token);
    return this.http.get(`${this.apiUrl}profile`, { headers });
  }
  

  signupUser(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}auth/signup`,data)
  }

  loginUser(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}auth/login`,data)
  }
}
