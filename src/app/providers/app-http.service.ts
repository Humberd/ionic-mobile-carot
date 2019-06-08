import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Initiative } from '../_models/initiative';

@Injectable({
  providedIn: 'root'
})
export class AppHttpService {

  constructor(private http: HttpClient) { }

  getInitiatives(): Observable<Initiative[]> {
    return this.http.get<Initiative[]>('/v1/initiatives')
  }

  upvote(initiativeId: string): Observable<Initiative> {
    return this.http.post<Initiative>(`/v1/initiatives/${initiativeId}/upvote`, null)
  }

  downvote(initiativeId: string): Observable<Initiative> {
    return this.http.post<Initiative>(`/v1/initiatives/${initiativeId}/downvote`, null)
  }

  removevote(initiativeId: string): Observable<Initiative> {
    return this.http.post<Initiative>(`/v1/initiatives/${initiativeId}/removevote`, null)
  }

}
