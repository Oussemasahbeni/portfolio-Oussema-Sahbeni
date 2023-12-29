import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class GithubApiService {

  constructor(private http: HttpClient) { }

  private headers = new HttpHeaders({
    'Authorization': `token ${environment.token}`
  })



  getInfo() {
    return this.http.get('https://api.github.com/users/Oussemasahbeni', { headers: this.headers });
  }

}
