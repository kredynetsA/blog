import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  limit: number = 9;

  constructor(private http: HttpClient) { }
  getPosts(page: number, locale?: any) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept-Language', locale.Locale.toString());
    return this.http.get<any>(`https://panel.7-price.com/Blog/Get?page=${page}&limit=${this.limit}&sort=new&direction=desc`, {headers})
  }
}
