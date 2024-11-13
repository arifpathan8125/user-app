import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Apollo, ApolloModule } from 'apollo-angular';
import { UserService } from './services/user.service';
import { UserRepoDetailsComponent } from './components/user-repo-details/user-repo-details.component';
import { RepositoriesStarsChartComponent } from './components/repositories-stars-chart/repositories-stars-chart.component';
import { RouterModule } from '@angular/router';
import { UserStore } from './store/user.store';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockUserService: UserService;
  let mockReposStore: any;

  mockReposStore = jasmine.createSpyObj('ReposStore', ['setRepos']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        ApolloModule,
        RouterModule.forRoot(
        [{path: 'user-repo-details', component: UserRepoDetailsComponent}, {path: 'repositories-stars-chart', component: RepositoriesStarsChartComponent}]
        )
      ],
      providers: [UserService, Apollo, { provide: UserStore, useValue: mockReposStore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    mockUserService = TestBed.inject(UserService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should unsubscribe on ngOnDestroy', () => {
    spyOn(component['ngUnsubscribe'], 'next');
    spyOn(component['ngUnsubscribe'], 'complete');
    component.ngOnDestroy();
    expect(component['ngUnsubscribe'].next).toHaveBeenCalledWith(null);
    expect(component['ngUnsubscribe'].complete).toHaveBeenCalled();
  });
});
