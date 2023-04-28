import {
  Component,
  OnDestroy,
} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LocaleService} from "./services/locale.service";
import {NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'blog';
  subscriptions: any[] = [];
  backBtn?: boolean = false;
  constructor(public translateService: TranslateService,
              private localeService: LocaleService,
              private router: Router
              ) {
   let sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log(event)
        if (event.url == '/blog' || event.url == '/') {
          this.backBtn = false
        } else {
          this.backBtn = true
        }
      }
    })
    this.subscriptions.push(sub)
    const locale = this.localeService.getCurrentLocale();
    this.translateService.use(locale.LocaleString)
    let sub1 = this.localeService.locale.subscribe((res) => {
      this.translateService.use(res.LocaleString)
    });
    this.subscriptions.push(sub1)
  }


  ngOnDestroy() {
    this.subscriptions.forEach((sub: any) => {
      sub.unsubscribe()
    });
  }
}
