import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  reportsApiDummy: string = 'https://172.25.180.162:12345/api-gateway/api/gps-data-exporter/v0.1/report?sort=creationDate,DESC'
  reportsApiDummyDownload: string = 'https://172.25.180.162:12345/api-gateway/api/gps-data-exporter/v0.1/report/'
  exportApiDummy: string = 'https://172.25.180.162:12345/api-gateway/api/gps-data-exporter/v0.1/export'
  headers = new HttpHeaders().set('Content-Type', '*/*');
  cookieEndpoint: string = ''
  

  constructor(private http: HttpClient,private cookies: CookieService) {
    const cookieName = 'esps_api_gateway_url';
    this.cookieEndpoint = this.cookies.get(cookieName);
    if (this.cookieEndpoint) {
      this.reportsApiDummy = `${this.cookieEndpoint}/gps-data-exporter/v0.1/report?sort=creationDate,DESC`;
      this.reportsApiDummyDownload = `${this.cookieEndpoint}/gps-data-exporter/v0.1/report/`;
      this.exportApiDummy = `${this.cookieEndpoint}/gps-data-exporter/v0.1/export`;
    }
  }

  public getAllReports(pageNumber: number){                       
    return this.http.get<any>(this.reportsApiDummy+'&page='+pageNumber);
  }
  public createReport(from: number, until: number, bodyRequest:any) {
    this.http.post(this.exportApiDummy +'/gps?'+'from='+from+'&until='+until,bodyRequest).subscribe({
        next: (res) => {
        },
        error: (e) => alert(e),
      });
  }

  public downloadReport(id: number): Observable<any>  {
    return this.http.get(this.reportsApiDummyDownload + id + '/download', {responseType: "text"});
  }
  // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
