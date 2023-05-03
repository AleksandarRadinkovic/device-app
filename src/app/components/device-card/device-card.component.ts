import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { DeviceInterface } from '../../types/DeviceInterface';

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss'],
})
export class DeviceCardComponent implements OnInit {
  @Input() data: DeviceInterface = {} as DeviceInterface;
  @Input() selected: boolean = false;
  @Output() selectDevice = new EventEmitter<number>();
  
  constructor() {}

  ngOnInit(): void {}
  onSelectDevice() {
    this.selectDevice.emit(this.data.issi);
  }
}
