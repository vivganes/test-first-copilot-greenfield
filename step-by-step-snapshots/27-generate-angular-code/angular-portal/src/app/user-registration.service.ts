// GH Copilot code - starts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class UserRegistrationService {
  constructor(private apiService: ApiService) {}

  registerUser(data: any): Observable<any> {
    // Call API with correct payload
    return this.apiService.post('/api/v1/users/register', data);
  }
}
// GH Copilot code - end
