import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DevicesService } from '../../services/devices.service';
import { GroupInterface } from '../../types/GroupInterface';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';
import {DeviceInterface} from "../../types/DeviceInterface";
import { ReportsService } from 'src/app/services/reports.service';
import { checkDates } from '../reports-table/validators/validators';
import { GroupListComponent } from '../group-list/group-list.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() opened: boolean = true;
  @Output() toggle = new EventEmitter<string>();
  public groups: GroupInterface[] = [];
  public findDevice: string = '';
  public deviceList: DeviceInterface[] = [];
  public isCSVChecked = false;
  public isKMLChecked = false;
  public selectedDevices: number[] = [];

  @ViewChild('fromPicker') fromPicker: any;
  @ViewChild('untilPicker') untilPicker: any;
  @ViewChild(GroupListComponent) groupListComponent!: GroupListComponent; 

  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public color: ThemePalette = 'primary';

  public formGroup = new FormGroup({
    from: new FormControl(new Date(), [Validators.required, checkDates('from', 'until')]),
    until: new FormControl(new Date(), [Validators.required, checkDates('from', 'until')]),
    csv: new FormControl(this.isCSVChecked),
    kml: new FormControl(this.isKMLChecked),
  });

  public fromDateControl = new FormControl(new Date());
  public toDateControl = new FormControl(new Date());
  public dateControlMinMax = new FormControl(new Date());

  public options = [
    { value: true, label: 'True' },
    { value: false, label: 'False' }
  ];

  constructor(private devicesService: DevicesService, private reportsService: ReportsService, public translate: TranslateService) {}

  async ngOnInit() {
    this.groups = await this.devicesService.getTopLevelGroups();
    this.groups.forEach(item => {
      item.devices.forEach(device => {
      });
    });
  }

  generateReport() {
    const from = new Date(this.formGroup.value.from).getTime();
    const until = new Date(this.formGroup.value.until).getTime();

    const formatInLink = this.formGroup.value.csv? 'CSV':'KML';
    let obj = {
      deviceIds: ["1500"], // Use selectedDevices array here
      reportFormat: [
        formatInLink
      ]
    }
    this.reportsService.createReport(from, until, obj);
    console.log(this.selectedDevices);
    window.location.reload();
  }

  onSelectDevices(selectedDevices: number[]) {
    this.selectedDevices = selectedDevices; // Assign selected device IDs to selectedDevices array
  }
  public handleCheckboxClick(checkboxName: string) {
    if (checkboxName === 'csv') {
      this.formGroup.get('kml')?.setValue(false);
    } else if (checkboxName === 'kml') {
      this.formGroup.get('csv')?.setValue(false);
    }
  }
  public isUntilBeforeFrom(): boolean {
    const from = moment(this.formGroup.value.from);
    const until = moment(this.formGroup.value.until);
    return until.isBefore(from);
  }
  removeDevices(devices: DeviceInterface[]) {
    this.deviceList = this.deviceList.filter((device) => {
      return !devices.includes(device)
    });
  }
}
