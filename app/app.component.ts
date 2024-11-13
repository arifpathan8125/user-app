import { ChangeDetectionStrategy, Component, inject, OnDestroy, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { ApolloModule } from 'apollo-angular';
import { UserStore } from './store/user.store';
import { RepoList } from './models/user.model';
import { GraphQLModule } from './graphql.module';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, ApolloModule, GraphQLModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  repoList: RepoList[] = [];
  enableHome = signal(false);
  readonly store = inject(UserStore);

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.detectRouterChanges();
    this.detectUserRepos();
  }

  detectRouterChanges() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      if (event.url == '/') {
        this.enableHome.set(true);
      }
      else {
        this.enableHome.set(false);
      }
    });
  }
  
  detectUserRepos() {
    this.userService.getUserRepos().pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: any) => {
      if (res) {
        const data = res?.data?.repositoryOwner?.repositories?.nodes;
        let resp: RepoList[] = [];
        if (data?.length) {
          resp = data.map((x: any) => {
            return {
              name: x.name,
              stargazerCount: x.stargazerCount,
              createdAt: x.createdAt ? (new Date(x.createdAt).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric'})) : '',
              forksCount: x.forks.totalCount,
              watchersCount: x.watchers.totalCount,
              pullRequestsCount: x.pullRequests.totalCount,
              url: x.url,
              description: x.description,
              isPrivate: x.isPrivate,
            }
          })
        }
        this.store.setRepos(resp);
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}

