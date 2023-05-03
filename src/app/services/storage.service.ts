import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private cookieService: CookieService) {}

  public getCookie(name: string) {
    return this.cookieService.get(name);
  }

  public setCookie(name: string, value: any) {
    return this.cookieService.set(name, value);
  }

  public setDevelopmentEnv() {
    this.cookieService.set(
      'esps_auth_token',
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJyb2xlcyI6IlJFUjB3MEFWWGFFYmZRNmlwejlKZmFFVUpWZG9YU3lpQjFreG1RQ2x1M3JqWStnMmhpVzdYcnVkaGtzSWFObTUiLCJpc3MiOiJlU1BTLXBvcnRhbCIsImV4cCI6MTY1NTk5NDUwMywiaWF0IjoxNjU1OTgyNTAzLCJ1c2VybmFtZSI6ImpvdmFuIn0.-AtV0Ak3-HjRiZKsfc248nUPzJtari2k3dzhAIn3SFGhdbM4VJbVTWC7g8ZstFRy'
    );
    this.cookieService.set('esps_token_refresh_url', 'https://api.staging.tetra.pro:443/token/refresh');
    this.cookieService.set('onlyActiveDevicesTimeout', '20');
    this.cookieService.set('cookieiframeurl', '/esps-gps/');
    this.cookieService.set('toggleDeviceFocus', 'true');
    this.cookieService.set('toggleDeviceAccuracy', 'true');
    this.cookieService.set('DARWIN_LANGUAGE', 'en');

    console.info('Cookie data set!');
  }
}
