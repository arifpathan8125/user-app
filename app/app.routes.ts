import { Routes } from '@angular/router';
import { UserRepoDetailsComponent } from './components/user-repo-details/user-repo-details.component';
import { RepositoriesStarsChartComponent } from './components/repositories-stars-chart/repositories-stars-chart.component';

export const routes: Routes = [
    { path: 'user-repo-details', component: UserRepoDetailsComponent },
    { path: 'repositories-stars-chart', component: RepositoriesStarsChartComponent },
  ];
