import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { shareReplay } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class GithubApiService {
  private http = inject(HttpClient);





  getInfo() {
    return this.http.get('https://api.github.com/users/Oussemasahbeni').pipe(
      shareReplay(1)

    );
  }

}
