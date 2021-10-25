import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

const AUTH_API = "http://localhost:3000/api/v1/";
const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  register(username: string, email: string, password: string, type: string): Observable<any> {
    return this.http.post(AUTH_API+"auth/register", {
      username,
      email,
      password,
      type
    },HTTP_OPTIONS);
  }

  login(email: string, password: string, type: string): Observable<any> {
    return this.http.post(AUTH_API+"auth/login",{
      email,
      password,
      type
    },HTTP_OPTIONS);
  }
}
