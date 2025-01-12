import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://fakestoreapi.com/users';
  private currentUserSubject = new BehaviorSubject<any>(this.getCurrentUser());

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  login(username: string, password: string): Observable<any> {
    return this.http.get(`${this.apiUrl}`).pipe(
      map((users: any) => {
        if (Array.isArray(users)) {
          const user = users.find(u => u.username === username && u.password === password);
          if (user) {
            this.setCurrentUser(user);
            this.currentUserSubject.next(user);
            return user;
          } else {
            throw new Error('Invalid username or password');
          }
        } else {
          throw new Error('Unexpected data format from API');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login error', error);
        return throwError(() => error);
      })
    );
  }

  private getCurrentUser(): any {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('currentUser');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  }

  private setCurrentUser(user: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  get CurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
