import { Component, OnInit } from '@angular/core';
import {LocaleService} from "../../services/locale.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(localeService: LocaleService) { }

  ngOnInit(): void {
  }

}
