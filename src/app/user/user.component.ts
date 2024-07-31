import { Component, OnInit } from '@angular/core';
import { UserService } from '../servic/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent  implements OnInit{
users:any[]=[];
selectedUser:any=null;
userId:string='';
newPassword:string='';
paginatedUsers: any[] = [];
currentPage: number = 1;
itemsPerPage: number = 10;
totalPages: number = 1;
constructor(private userService: UserService) {}

ngOnInit(): void {
  this.loadAllUsers();
}

loadAllUsers(): void {
  this.userService.getAllUsers().subscribe(data => {
    this.users = data;
    this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
    this.updatePaginatedUsers();
  });
}
updatePaginatedUsers(): void {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  this.paginatedUsers = this.users.slice(startIndex, endIndex);
}

previousPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.updatePaginatedUsers();
  }
}

nextPage(): void {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.updatePaginatedUsers();
  }
}
getUserById(): void {
  if (this.userId) {
    this.userService.getUserById(this.userId).subscribe(data => {
      this.selectedUser = data;
    });
  }
}

updatePassword(): void {
  if (this.userId && this.newPassword) {
    this.userService.updatePassword(this.userId, this.newPassword).subscribe(data => {
      this.selectedUser = data;
      this.loadAllUsers();
      alert('Password updated successfully!');
    });
  }
}
}
