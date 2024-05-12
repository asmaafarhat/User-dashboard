import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user/user.module';
import { ApiService } from 'src/app/api.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [MatCardModule, CommonModule, MatProgressSpinnerModule],
})
export class HomeComponent implements OnInit {
  users :any = [];
  data :any = [];
  page: any;
  user: User = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    avatar: ''
  };
  total_pages: any;
  numbers: any;
  noResult = false;
  isLoading = false;
  stringToStore = "";

  constructor(private userService: ApiService,
    private router: Router,
  ) { 
    
  }

  async ngOnInit() { 
    setTimeout(async () => {
      await this.getUsers(1);
    }, 2000);
  }

  getUsers(i: number) {
    this.userService.getAllUsers(i).subscribe(data => 
      {
        this.noResult = false;
        this.isLoading = true;
        this.data = data;
        this.stringToStore = JSON.stringify(data);
        localStorage.setItem("data", this.stringToStore);
        this.users = this.data['data'];
        this.page = this.data['page'];
        this.total_pages = this.data['total_pages'];
        this.numbers = Array(this.total_pages).fill(0).map((x,i)=>i);
      });
      
  }

  onPageChange(i: any) {
    // Fetch the data for the selected page
    this.getUsers(i);
  }

  userInfo(id: number) {
    this.router.navigate(['/detail', id])
  }

  onKeyUp(e: any) {
    let that = this;
    let id = e.target.value;
    setTimeout(function () {
      if (id != "") {
        that.userService.getUser(id).subscribe(data => 
          {
            if (data) {
              that.isLoading = true;
              that.user = data['data'];
              that.total_pages = 1;
              that.numbers = Array(that.total_pages).fill(0).map((x,i)=>i);
            } else {
              that.noResult = true;
            }
          });
          
      } else {
        that.user = {
          id: 0,
          first_name: '',
          last_name: '',
          email: '',
          avatar: ''
        };
        var fromStorage = localStorage.getItem("data");
        that.data = JSON.parse(fromStorage || '{}')
        that.users = that.data['data'];
        that.page = that.data['page'];
        that.total_pages = that.data['total_pages'];
        that.numbers = Array(that.total_pages).fill(0).map((x,i)=>i);
      }
    }, 800);
  }
}
