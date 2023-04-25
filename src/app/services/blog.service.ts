import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }
  getPosts() {
    // const header = {
    //   "accept-language": "uk-UA"
    // }
    return this.http.get<any>('https://panel.7-price.com/Blog/GetAllArticles')
  }
}
