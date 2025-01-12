import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../authentication.service';
import { NgIf } from '@angular/common';

interface User {
  firstName: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.CurrentUser.subscribe(
      (user: User | null) => {
        this.currentUser = user;
      },
      (error) => {
        console.error('Error fetching current user:', error);
      }
    );
  }

  navigateToProfile() {
    this.router.navigate(['/users']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}