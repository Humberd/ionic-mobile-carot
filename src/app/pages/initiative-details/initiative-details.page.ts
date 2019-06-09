import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
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

  constructor(private activatedRoute: ActivatedRoute,
              private http: AppHttpService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.destroy$),
        map(it => it.get('id')),
        filter(Boolean),
        distinctUntilChanged(),
        switchMap(id => this.http.getInitiative(id))
      )
      .subscribe(initiative => {
        this.initiative = initiative;
      })
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
      obs = this.http.removevote(initiative.id)
    } else {
      obs = this.http.upvote(initiative.id)
    }

    obs
      .subscribe(it => this.initiative = it)
  }

}
