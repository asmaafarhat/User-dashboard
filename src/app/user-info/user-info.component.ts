import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {
  id: any;
  data :any;
  user: any;
  support: any;
  isLoading = false;

  constructor(private _location: Location,
    private route: ActivatedRoute,
    private userService: ApiService
  ) {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
   }

  ngOnInit(): void {
    setTimeout(async () => {
      this.userService.getUser(this.id).subscribe(data => 
        {
          this.data = data;
          this.isLoading = true;
          this.user = this.data['data'];
          this.support = this.data['support'];
        });
    }, 2000);
  }

  backClicked() {
    this._location.back();
  }
}
