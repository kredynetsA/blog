import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  localeOptions: any [] = [
    {
      Locale: 3,
      LocaleString: "en",
    },
    {
      Locale: 2,
      LocaleString: "ua",
    },
    {
      Locale: 1,
      LocaleString: "ru",
    }
  ];
locale = new Subject<any>();

  constructor() {
    if (!localStorage.getItem('locale')) {
      let currentLocale: any = {
        Locale: 2,
        LocaleString: "ua",
      };
      this.setLocale(currentLocale)
      localStorage.setItem('locale', JSON.stringify(currentLocale))
    }

  }
  setLocale(locale: any) {
    localStorage.setItem('locale', JSON.stringify(locale))
    this.locale.next(locale)
  }

  getCurrentLocale() {
    const locale: any = localStorage.getItem('locale')
   return JSON.parse(locale)
  }

}
