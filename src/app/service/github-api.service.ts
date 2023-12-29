import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class GithubApiService {

  constructor(private http: HttpClient) { }




  getInfo() {
    return this.http.get('https://api.github.com/users/Oussemasahbeni');
  }

}
