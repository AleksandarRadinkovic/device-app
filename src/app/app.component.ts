import {Component, isDevMode} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {StorageService} from "./services/storage.service";
import {ReportsService} from "./services/reports.service";
import {ReportInterface} from "./types/ReportInterface";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Data Export';
  isOpen: boolean = true;
  reportList: ReportInterface[] = [];
  languageName: any;

  constructor(public translate: TranslateService, private storageService: StorageService, private reportsService: ReportsService, private cookies: CookieService) {
    translate.addLangs(['en', 'de','sr-ME']);
    translate.setDefaultLang('en');
    this.languageName = this.cookies.get('DARWIN_LANGUAGE');
    translate.use(this.languageName)
  }

  async ngOnInit() {
    if (isDevMode()) {
      console.log('Development');
      this.storageService.setDevelopmentEnv();
    } else {
      console.log('Production');
    }
  }
}
