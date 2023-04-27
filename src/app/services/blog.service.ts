import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  limit: number = 9;

  backBtn = new Subject<boolean>();
  // backBtn: boolean = false;

  constructor(private http: HttpClient) { }
  getPosts(page: number, locale?: any) {
    // this.backBtn.next(false)
    let headers = new HttpHeaders();
    headers = headers.set('Accept-Language', locale.Locale.toString());
    return this.http.get<any>(`https://panel.7-price.com/Blog/Get?page=${page}&limit=${this.limit}&sort=new&direction=desc`, {headers})
  }

  getPost(slug: string, locale?: any) {
    // this.backBtn.next(true)
    let headers = new HttpHeaders();
    headers = headers.set('Accept-Language', locale.Locale.toString());
    return this.http.get<any>(`https://panel.7-price.com/Blog/GetBySlug?slug=${slug}`, {headers})
  }
}
