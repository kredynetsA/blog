import { Component, OnInit } from '@angular/core';
import {LocaleService} from "../../services/locale.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  localeOptions: any[] = [];
  curentLang: string = '';
  currentLocale: any = {};
  optionsList: any = [];

  constructor(private localeService: LocaleService, public translateService: TranslateService) { }

  ngOnInit(): void {
    this.localeOptions = this.localeService.localeOptions;
    this.currentLocale = this.localeService.getCurrentLocale();
    this.curentLang = this.currentLocale.LocaleString
    this.optionsList = this.localeOptions.filter((x) => {
      return x.LocaleString != this.curentLang
    })
  }

  onChange(t: any) {
    this.translateService.use(this.curentLang);
    this.curentLang = t.LocaleString
    this.optionsList = this.localeOptions.filter((x) => {
      return x.LocaleString != t.LocaleString
    })
    this.localeService.setLocale(t)
    this.localeService.locale.next(t)
  }

}
