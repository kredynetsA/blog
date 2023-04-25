import { Component, OnInit } from '@angular/core';
import {BlogService} from "../../services/blog.service";
import {filter, map} from "rxjs";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
data: any[] = [];
// data: any[] = [1, 2, 3, 4, 5, 6];
  LocaleString: string = "ua"
  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getPosts()
      .subscribe((res:any) => {
      console.log(res)
        this.data = res
    })
  }

}
