import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private apiUrl = 'http://localhost:3000/api/users';
  private pdfUrl = 'http://localhost:3000/api/pdf';

  constructor(private http: HttpClient) {}

  // Get all users from the server
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Update a user on the server
  updateUser(user: any): Observable<any> {
    console.log(user);
    return this.http.put(`${this.apiUrl}/${user._id}`, user);
  }

  // Delete a user from the server
  deleteUser(userId: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }

  // Generate PDF for a specific user on the server
  generatePdf(userData: any): Observable<any> {
    return this.http.post<any>(`${this.pdfUrl}`, userData);
  }

  // Generate PDF for all users on the server
  async generatePdfalluser(): Promise<any> {
    try {
      const response: any = await this.http.get(`${this.pdfUrl}/allusers`).toPromise(); // Make an HTTP GET request to fetch PDF data for all users
      console.log(response);
      return "data:application/pdf;base64," + response.pdfBase64; // Return the PDF data in base64 format
    } catch (error) {
      throw new Error('Failed to generate PDF'); // Throw an error if PDF generation fails
    }
  }
}
