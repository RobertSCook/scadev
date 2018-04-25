import { Component, OnInit } from '@angular/core';
import { TeammateSchedule } from '../models/teammate-schedule';
import { DataService } from '../data.service';
import { Facility } from '../models/facility';
import { TeammateScheduleResponse } from '../models/teammate-schedule-response';
import * as moment from 'moment';

@Component({
  selector: 'sca-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {
  scheduleList: TeammateSchedule[];
  columnHeaders: string[];
  stringWeek: string;
  loadingList = false;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  getTeammateScheduleList(facility: Facility, weekStart: Date) {
    this.loadingList = true;
    this.stringWeek = `${weekStart.getFullYear}-${weekStart.getMonth}-${weekStart.getDay}`;
    this.dataService.getTeammateSchedule(facility.facilityId, this.stringWeek).subscribe((response: TeammateScheduleResponse) => {
      this.scheduleList = response.data;
      this.writeColumns(weekStart);
    }, (errorMsg: string) => {
      alert(errorMsg); // TODO: Change this to a toaster or something
    });


    this.loadingList = false;
  }

  writeColumns(weekStart: Date) {
    const columnTemplate: string[] = [
        'Teammate',
        'Employee Type',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'];

    let i = 2;
    let columnString = '';
    let dateContainer: moment.Moment = moment(weekStart);
    this.columnHeaders = columnTemplate;

    while (i < columnTemplate.length) {
      dateContainer = moment(weekStart);
      columnString = `${columnTemplate[i]} ${dateContainer.add((i - 2), 'days').format('MM/DD/YYYY')}`;
      this.columnHeaders[i] = columnString;
      i++;
    }
  }

}
