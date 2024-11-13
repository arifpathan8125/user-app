import { Component, inject, OnInit } from '@angular/core';
import { UserStore } from '../../store/user.store';
import { ColDefs, FilterParams, filterParams } from '../../models/user.model';
import { AgGridAngular } from 'ag-grid-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-repo-details',
  standalone: true,
  imports: [AgGridAngular, RouterLink],
  templateUrl: './user-repo-details.component.html'
})
export class UserRepoDetailsComponent implements OnInit {
  readonly store = inject(UserStore);
  pagination: boolean = true;
  paginationPageSize: number = 10;
  paginationPageSizeSelector: number[] = [10, 20, 50];
  filterParams: FilterParams = filterParams;
  colDefs: ColDefs[] = [];

  ngOnInit(): void {
    this.colDefs = [
      { headerName: 'Name', field: "name", filter: true, floatingFilter: true, initialWidth: 150 },
      { headerName: 'No. of Stars', field: "stargazerCount", filter: true, floatingFilter: true, initialWidth: 150 },
      { headerName: 'No. of Watchers', field: "watchersCount", filter: true, floatingFilter: true, initialWidth: 150 },
      { headerName: 'Forks Count', field: "forksCount", filter: true, floatingFilter: true, initialWidth: 150 },
      { headerName: 'PRs Count', field: "pullRequestsCount", filter: true, floatingFilter: true, initialWidth: 150 },
      { headerName: 'Created At', field: "createdAt", filter: 'agDateColumnFilter',filterParams: this.filterParams, floatingFilter: true, initialWidth: 150
      },
      { headerName: 'Description', field: "description", filter: true, floatingFilter: true, initialWidth: 220, 
        tooltipField: "description",
      },
    ];
  }
}
