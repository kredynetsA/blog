import {AfterContentChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BlogService} from "../../services/blog.service";
import {LocaleService} from "../../services/locale.service";

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit, AfterContentChecked, OnDestroy {
activeSlug: string = '';
locale: any = {};
post: any = {};
content: any;
wrapper: any;
subscriptions: any[] = [];
  constructor(private activeRoute: ActivatedRoute, private blogService: BlogService, private localeService: LocaleService) {
   let sub =  this.activeRoute.params.subscribe((res:any) => {
      this.activeSlug = res.id
      this.locale = this.localeService.getCurrentLocale();
    })
    this.subscriptions.push(sub)
  }

  ngOnInit(): void {
   let sub1 = this.localeService.locale.subscribe((res: any) => {
      if (this.locale.Locale != res.Locale) {
        this.locale = res
        this.getPost(this.activeSlug, this.locale);
      }
    })
   this.getPost(this.activeSlug, this.locale);
    this.subscriptions.push(sub1)
  }

  getPost(slug: string, locale: any) {
    if (slug) {
     let sub2 = this.blogService.getPost(this.activeSlug, locale).subscribe((res: any) => {
        this.post = res
        this.content = JSON.parse(res.Content).blocks
        this.buildUi(this.content)
      })
      this.subscriptions.push(sub2)
    }
  }
  ngAfterContentChecked() {
    this.wrapper = document.querySelector('.blog_content')
  }

  buildUi(content: any) {
    const arr: any = [];
    content.forEach((el: any) => {
      if (el.type == 'paragraph') {
        if (el.data.text.includes('<b>')) {
          let p = `<p style="font-weight: bold; margin: 10px 0">${el.data.text}</p>`
          arr.push(p)
        } else {
          let p = `<p>${el.data.text}</p>`
          arr.push(p)
        }
      }
      if (el.type == 'header') {
        let h1 = `<h1 style="text-align: center; font-weight: bold; margin-bottom: 20px; font-size: 22px;">${el.data.text}</h1>`
        arr.push(h1)
      }
      if (el.type == 'image') {
        let img = `<img style="width: 35%;  float: left; margin: 10px 10px 10px 0" src="${el.data.file.url}"/>`
        arr.push(img)
      }
    })
    this.content =  arr.toString().replace(/,/g, '')
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: any) => {
      sub.unsubscribe();
    })
  }
}

