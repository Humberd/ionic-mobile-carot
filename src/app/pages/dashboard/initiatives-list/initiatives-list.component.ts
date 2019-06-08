import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppHttpService } from '../../../providers/app-http.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Initiative } from '../../../_models/initiative';

@Component({
  selector: 'initiatives-list',
  templateUrl: './initiatives-list.component.html',
  styleUrls: ['./initiatives-list.component.scss'],
})
export class InitiativesListComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();
  private initiatives: Initiative[];

  constructor(private http: AppHttpService,
              private activedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activedRoute.paramMap
      .pipe(
        takeUntil(this.destroy$),
        map(map => map.get('groupId')),
        filter(Boolean),
        distinctUntilChanged(),
        tap(groupId => console.log({groupId})),
        switchMap(groupId => this.http.getInitiatives())
      )
      .subscribe(initiatives => {
        this.initiatives = initiatives
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  isLiked(initiative: Initiative): boolean {
    return initiative.user_vote
  }

}
