import { map } from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {IAppState} from '../state/app.state';
import {getSubjectId} from '../selectors/subject.selector';
import {NewsRestService} from '../../services/news/news-rest.service';
import * as newsActions from '../actions/news.actions';
import * as subjectSelectors from '../selectors/subject.selector';


@Injectable()
export class NewsEffects {

  constructor(private actions$: Actions,
              private store: Store<IAppState>,
              private rest: NewsRestService
  ) {}

  getNews$ = createEffect(() => this.actions$.pipe(
    ofType(newsActions.loadNews),
    withLatestFrom(this.store.select(getSubjectId)),
    switchMap(([_, subjectId]) => this.rest.getAllNews(subjectId).pipe(
      map(news => newsActions.loadNewsSuccess({ news }))
    ))
  ));

  disableNews$ = createEffect(() => this.actions$.pipe(
    ofType(newsActions.disableAllNews),
    switchMap(() => this.store.select(subjectSelectors.getSubjectId)),
    mergeMap(subjectId => this.rest.disableNews(subjectId).pipe(
      map(() => newsActions.loadNews())
    ))
  ));

  enableNews$ = createEffect(() => this.actions$.pipe(
    ofType(newsActions.enableAllNews),
    switchMap(() => this.store.select(subjectSelectors.getSubjectId)),
    mergeMap(subjectId => this.rest.enableNews(subjectId).pipe(
      map(() => newsActions.loadNews())
    ))
  ));

  saveNews$ = createEffect(() => this.actions$.pipe(
    ofType(newsActions.saveNews),
    withLatestFrom(this.store.select(subjectSelectors.getSubjectId)),
    mergeMap(([{ news }, subjectId]) => (news.subjectId = subjectId, this.rest.saveNews(news)).pipe(
      map(() => newsActions.loadNews())
    ))
  ));

  deleteNews$ = createEffect(() => this.actions$.pipe(
    ofType(newsActions.deleteNewsById),
    withLatestFrom(this.store.select(subjectSelectors.getSubjectId)),
    mergeMap(([{ id }, subjectId]) => this.rest.deleteNews(id, subjectId).pipe(
      map(() => newsActions.loadNews())
    ))
  ));

}
