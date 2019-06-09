import { Component, OnInit } from '@angular/core';
import { AppHttpService } from '../../providers/app-http.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  queryText = '';
  selectedGroupId = 'zlota52';

  constructor(private http: AppHttpService) {
  }

  ngOnInit() {
  }

  search() {
    console.log('search');
    console.log(this.queryText);
  }

  selectGroup(groupId: string) {
    this.selectedGroupId = groupId;
  }

}
