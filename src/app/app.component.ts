import {Component, OnDestroy} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LocaleService} from "./services/locale.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  title = 'blog';
  subscription: any;
  constructor(public translateService: TranslateService, private localeService: LocaleService) {
    const locale = this.localeService.getCurrentLocale();
    this.translateService.use(locale.LocaleString)

    this.subscription = this.localeService.locale.subscribe((res) => {
      this.translateService.use(res.LocaleString)
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
