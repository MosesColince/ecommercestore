import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../users.service';
import { CommonModule } from '@angular/common';
import { User } from '../../user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[]=[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data; 
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
