import { Component, OnInit } from '@angular/core';
import { AppHttpService } from '../../providers/app-http.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  queryText ='';

  constructor(private http: AppHttpService) {
  }

  ngOnInit() {
    this.http.getInitiatives().subscribe(console.log)
  }

  search() {
    console.log('search')
  }

}
