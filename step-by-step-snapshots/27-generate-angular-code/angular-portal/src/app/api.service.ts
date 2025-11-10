// GH Copilot code - starts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  post(url: string, body: any): Observable<any> {
    // Simulate API POST
    return of({ success: true });
  }
}
// GH Copilot code - end
