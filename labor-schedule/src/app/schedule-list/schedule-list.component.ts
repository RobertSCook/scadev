import { Component, OnInit } from '@angular/core';
import { TeammateSchedule } from '../models/teammate-schedule';
import { DataService } from '../data.service';
import { Facility } from '../models/facility';
import { TeammateScheduleResponse } from '../models/teammate-schedule-response';

@Component({
  selector: 'sca-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {
  scheduleList: TeammateSchedule[];
  stringWeek: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  getTeammateScheduleList(facility: Facility, weekStart: Date) {
    this.stringWeek = `${weekStart.getFullYear}-${weekStart.getMonth}-${weekStart.getDay}`;
    this.dataService.getTeammateSchedule(facility.facilityId, this.stringWeek).subscribe((response: TeammateScheduleResponse) => {
      this.scheduleList = response.data;
    }, (errorMsg: string) => {
      alert(errorMsg); // TODO: Change this to a toaster or something
    });
  }

}
