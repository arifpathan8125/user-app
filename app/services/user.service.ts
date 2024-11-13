import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FETCH_QUERY } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo: Apollo) {}

  getUserRepos() {
    return this.apollo.query({ query: FETCH_QUERY, fetchPolicy: "cache-first"});
  }
}
