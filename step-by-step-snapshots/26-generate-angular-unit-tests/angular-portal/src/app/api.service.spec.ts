// GH Copilot code - starts
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(ApiService);
  });

  it('should make POST request and return response', () => {
    const payload = { foo: 'bar' };
    httpClientSpy.post.and.returnValue(of({ result: 'ok' }));
    service.post('/users/register', payload).subscribe(response => {
      expect(httpClientSpy.post).toHaveBeenCalledWith('/users/register', payload);
      expect(response.result).toBe('ok');
    });
  });

  it('should propagate errors from HttpClient', () => {
    httpClientSpy.post.and.returnValue(throwError(() => ({ error: { message: 'fail' } })));
    service.post('/users/register', {}).subscribe({
      error: err => {
        expect(err.error.message).toBe('fail');
      }
    });
  });
});
// GH Copilot code - end
