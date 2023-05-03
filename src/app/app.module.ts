import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {GroupListComponent} from "./components/group-list/group-list.component";
import {GroupCardComponent} from "./components/group-card/group-card.component";
import {DeviceCardComponent} from "./components/device-card/device-card.component";
import {TitleDividerComponent} from "./components/title-divider/title-divider.component";
import {FilterDevicesPipePipe} from "./components/group-list/filter-devices-pipe.pipe";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {AuthenticationInterceptor} from "./services/authentication.interceptor";
import {MatSidenavModule} from "@angular/material/sidenav";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import { CookieService } from 'ngx-cookie-service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule,  TranslatePipe } from '@ngx-translate/core';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ReportsTableComponent } from './components/reports-table/reports-table.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NgxMatNativeDateModule,
  NgxMatDateFormats, NGX_MAT_DATE_FORMATS
} from "@angular-material-components/datetime-picker";

import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TitleDividerComponent,
    GroupListComponent,
    DeviceCardComponent,
    FilterDevicesPipePipe,
    GroupCardComponent,
    ReportsTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatMomentModule,
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    { provide: NGX_MAT_DATE_FORMATS, useValue:  {
      useUtc: true,
      parse: {
        dateInput: 'DD.MM.YYYY, hh:mm A'
      },
      display: {
        dateInput: 'DD.MM.YYYY, HH:mm A',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
      },
      } }
    //{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
