import { Pipe, PipeTransform } from '@angular/core';
import { DeviceInterface } from '../../types/DeviceInterface';

@Pipe({
  name: 'filterDevicesPipe',
})
export class FilterDevicesPipePipe implements PipeTransform {
  transform(devices: DeviceInterface[], searchText: string) {
    return devices.filter((device) => device.alias.toLowerCase().includes(searchText.toLowerCase()));
  }
}
