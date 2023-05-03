import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, throwError} from 'rxjs';
import { environment } from '../../environments/environment';
import {DeviceInterface} from "../types/DeviceInterface";

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  // gpsAPI: string = environment.apiUrl + environment.gpsUrl + environment.apiVersion;
  private fleetmapAPI: string = environment.apiUrl + environment.fleetmapUrl + environment.apiVersion;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private devicesArr = new BehaviorSubject<DeviceInterface[]>([]);
  public selectedDevices$ = this.devicesArr.asObservable();

  constructor(private http: HttpClient) {}

  selectDevices(devices: DeviceInterface) {
    this.devicesArr.next(this.devicesArr.getValue().concat([devices]));
  }

  // removeDevices(devices: DeviceInterface) {
  //   this.devicesArr.next(this.devicesArr.getValue().filter((device) => {
  //     return !devices.includes(device)
  //   }));
  // }


  public getTopLevelGroups() {
    return new Promise<any>((resolve) => {
      this.http.get(this.fleetmapAPI + '/grouphierarchy/v/latest/roots/allowed').subscribe((res: any) => {
        return resolve(res);
      });
    });
  }

  public getChildGroups(groupId: string) {
    return new Promise<any>((resolve) => {
      this.http
        .get(this.fleetmapAPI + '/grouphierarchy/v/latest/groups/' + groupId + '/children/allowed')
        .subscribe((res: any) => {
          return resolve(res);
        });
    });
  }

  // public deviceLastPosition(deviceIds: any) {
  //   return new Promise<any>((resolve) => {
  //     this.http.post(this.gpsAPI + '/positions/lastthree', deviceIds).subscribe((res: any) => {
  //       return resolve(res);
  //     });
  //   });
  // }

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
