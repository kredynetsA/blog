import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {BlogService} from "../../services/blog.service";
import {LocaleService} from "../../services/locale.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {
  @HostListener("window:scroll", [])
  onScroll(): void {
    if (window.innerWidth <= 500) {
      if ((window.innerHeight + window.scrollY ) >= document.body.offsetHeight) {
        this.loadData();
      }
    }
  }
  pagination:any = {};
  posts: any [] = [];
  loadDataBtn: boolean = true;
  locale: any = {}
  page: number = 1;
  subscriptions: any [] = [];
  constructor(private blogService: BlogService, private localeService: LocaleService) {
    let locale = this.localeService.getCurrentLocale();
    this.getPosts(this.page, locale)
  }
  ngOnInit(): void {
    let sub = this.localeService.locale.subscribe((res: any) => {
      this.locale = res
      this.getPosts(this.page, this.locale);
    })
    this.subscriptions.push(sub)
    this.blogService.backBtn.next(false)
  }
  getPosts(page: number, locale: any) {
    let sub = this.blogService.getPosts(page, locale)
      .subscribe((res:any) => {
        this.pagination = res.pagination
        this.posts = res.items
      })
    this.subscriptions.push(sub)
  }

  loadData() {
    this.blogService.backBtn.next(true)
    let locale = this.localeService.getCurrentLocale();
    let currentPage = this.pagination.current_page
    let lastPage = this.pagination.last_page
    if (this.pagination.total == 0) {
      this.loadDataBtn = false
    }
    if (currentPage <= lastPage) {
     currentPage += 1
    }
   let sub = this.blogService.getPosts(currentPage, locale).subscribe((res: any) => {
      this.pagination = res.pagination
      this.posts = this.posts.concat(res.items)
    });
    this.subscriptions.push(sub)
  }
  ngOnDestroy() {
    this.subscriptions.forEach((x) => {
      x.unsubscribe();
    })
  }

}
