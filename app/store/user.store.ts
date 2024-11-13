import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { RepoList } from '../models/user.model';

type UserState = {
  repos: any[]
};

const initialState: UserState = {
  repos: []
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setRepos(repos: RepoList[]) {
      patchState(store, (state) => ({ repos: [ ...state.repos, ...repos ] }));
    }
  }))
);