import { HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { HttpLink } from 'apollo-angular/http'
import { InMemoryCache, ApolloClientOptions } from '@apollo/client/core'
import { gql } from "apollo-angular";

/* github graphql uri interface */
export interface Uri {
  uri: string;
  headers: HttpHeaders;
}

/* filterParams interface for date type */
export interface FilterParams {
  maxNumConditions: number;
  comparator: any;
}

/* Column definition interface for ag grid table */
export interface ColDefs {
  headerName: string;
  field: string;
  filter: boolean | string;
  floatingFilter: boolean;
  initialWidth: number;
  tooltipField?: string;
  filterParams?: FilterParams;
}

/* reposList interface */
export interface RepoList {
  createdAt: string;
  description: string;
  forksCount: number;
  isPrivate: boolean;
  name: string;
  pullRequestsCount: number;
  stargazerCount: number;
  url: string;
  watchersCount: number;

}

/* github graphql uri */
const uri: Uri = {
  uri: 'https://api.github.com/graphql',
  headers: new HttpHeaders({
    Authorization: `Bearer ${environment.tokenPart1}${environment.tokenPart2}`,
  })
}

/* returns an object of type ApolloClientOptions  */
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create(uri),
    cache: new InMemoryCache(),
    resolvers: {},
    defaultOptions: {
      query: {
        errorPolicy: "all"
      }
    }
  };
}

/* aggrid filterParams for date type */
export const filterParams: FilterParams = {
  maxNumConditions: 1,
  comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split("/");
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  }
};

export const FETCH_QUERY = gql`{
    repositoryOwner(login: "visionmedia") {
      repositories(last: 30) {
         nodes {
            name
            stargazerCount
            description
            createdAt
            watchers {
              totalCount
            }
            pullRequests {
              totalCount
            }
            forks {
              totalCount
            }
            isPrivate
            url
         }
       }
    }
  }`