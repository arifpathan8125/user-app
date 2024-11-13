import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserRepoDetailsComponent } from './user-repo-details.component';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../../app.component';

describe('UserRepoDetailsComponent', () => {
  let component: UserRepoDetailsComponent;
  let fixture: ComponentFixture<UserRepoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserRepoDetailsComponent, 
        RouterModule.forRoot(
          [{path: '', component: AppComponent}]
          )
        ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserRepoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default pagination values', () => {
    expect(component.pagination).toBeTrue();
    expect(component.paginationPageSize).toBe(10);
    expect(component.paginationPageSizeSelector).toEqual([10, 20, 50]);
  });

  it('should initialize colDefs on ngOnInit', () => {
    component.ngOnInit();
    expect(component.colDefs.length).toBe(7);

    expect(component.colDefs).toEqual([
      { headerName: 'Name', field: "name", filter: true, floatingFilter: true, initialWidth: 150 },
      { headerName: 'No. of Stars', field: "stargazerCount", filter: true, floatingFilter: true, initialWidth: 150 },
      { headerName: 'No. of Watchers', field: "watchersCount", filter: true, floatingFilter: true, initialWidth: 150 },
      { headerName: 'Forks Count', field: "forksCount", filter: true, floatingFilter: true, initialWidth: 150 },
      { headerName: 'PRs Count', field: "pullRequestsCount", filter: true, floatingFilter: true, initialWidth: 150 },
      { headerName: 'Created At', field: "createdAt", filter: 'agDateColumnFilter', filterParams: component.filterParams, floatingFilter: true, initialWidth: 150 },
      { headerName: 'Description', field: "description", filter: true, floatingFilter: true, initialWidth: 220, tooltipField: "description" }
    ]);
  });
});
