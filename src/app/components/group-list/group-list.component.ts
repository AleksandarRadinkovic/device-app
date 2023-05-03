import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GroupInterface } from '../../types/GroupInterface';
import { DevicesService } from '../../services/devices.service';
import { DeviceInterface } from '../../types/DeviceInterface';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit {
  public collapsed: boolean = true;
  public collapsedDevices: boolean = false;
  @Input() public data: GroupInterface = {} as GroupInterface;
  @Input() public filter: string = '';
  public childData: GroupInterface[] = [] as GroupInterface[];
  public devices: DeviceInterface[] = [];
  public selectGroup: boolean = false;
  @Output() selectDevices = new EventEmitter<number[]>();
  @Input() selectedDevices: number[] = []; 
  @Output() selected = new EventEmitter<number[]>();


  constructor(private devicesService: DevicesService) {}

  async ngOnInit() {
    this.childData = await this.devicesService.getChildGroups(this.data.id);
    this.devices = this.data.devices;
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  toggleDevices() {
    this.collapsedDevices = !this.collapsedDevices;
  }
  
  onSelectDevices() {
    this.selectedDevices = this.data.devices.filter((device: DeviceInterface) => {
      return device.issi;
    }).map((device: DeviceInterface) => device.issi);
    this.selectDevices.emit(this.selectedDevices);
  }
}