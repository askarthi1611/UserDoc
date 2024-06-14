import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private apiUrl = 'http://localhost:3000/api/users';
  // private apiUrl = 'https://userdoc-backend.onrender.com/api/users';
   //private apiUrl = 'https://askumb.netlify.app/api/users';

  constructor(private http: HttpClient) {}

  // Get user by ID
  getUserById(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  // Get all users
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Create a new user
  createUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user);
  }

  // Update a user
  updateUser(userId: string, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, user);
  }

  // Delete a user
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }
}
