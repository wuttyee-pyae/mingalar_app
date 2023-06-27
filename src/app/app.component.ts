import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mingalar-app';
  showFiller = false;
  lang: string = '';

  constructor(public translate: TranslateService){
    translate.addLangs(['en','mm']);
    translate.setDefaultLang('en');
    this.lang = "en";
  }

  ngOnInit() {}

  switchLang() {
    this.lang == 'en' ? this.translate.use('mm')  :  this.translate.use('en');
    (this.lang == 'en') ? this.lang = 'mm' :  this.lang = 'en';
  }

}
