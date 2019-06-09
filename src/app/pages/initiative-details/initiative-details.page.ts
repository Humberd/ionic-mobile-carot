import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { AppHttpService } from '../../providers/app-http.service';
import { Initiative } from '../../_models/initiative';

@Component({
  selector: 'initiative-details',
  templateUrl: './initiative-details.page.html',
  styleUrls: ['./initiative-details.page.scss'],
})
export class InitiativeDetailsPage implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();
  private initiative: Initiative;
  private paramChange: Observable<string>;
  private comments: Comment[];

  constructor(private activatedRoute: ActivatedRoute,
              private http: AppHttpService) {
  }

  ngOnInit() {
    this.paramChange = this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.destroy$),
        map(it => it.get('id')),
        filter(Boolean),
        distinctUntilChanged(),
      );

    this.paramChange
      .pipe(
        switchMap(id => this.http.getInitiative(id))
      )
      .subscribe(initiative => {
        this.initiative = initiative;
      });

    this.paramChange
      .pipe(
        switchMap(id => this.http.getComments(id))
      )
      .subscribe(comments => {
        this.comments = comments;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  isLiked(initiative: Initiative): boolean {
    return initiative.user_vote === 1;
  }

  toggleLike(initiative: Initiative) {
    let obs;
    if (this.isLiked(initiative)) {
      obs = this.http.removevote(initiative.id);
    } else {
      obs = this.http.upvote(initiative.id);
    }

    obs
      .subscribe(it => this.initiative = it);
  }

}
