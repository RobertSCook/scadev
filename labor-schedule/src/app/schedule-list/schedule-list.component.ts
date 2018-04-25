import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { environment } from '../../environments/environment';

import { TeammateSchedule } from '../models/teammate-schedule';
import { DataService } from '../data.service';
import { Facility } from '../models/facility';
import { TeammateScheduleResponse } from '../models/teammate-schedule-response';
import { ScheduleHeaders } from '../models/schedule-headers';

@Component({
  selector: 'sca-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {
  scheduleList: TeammateSchedule[];
  columnHeaders: ScheduleHeaders[];
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

  processANES(schedule: TeammateSchedule) {

  }

  // I feel like we are getting to the point where I need to break the columns out into a separate
  // component, but that isnt making a lot of sense to me at the moment
  writeColumns(weekStart: Date) {
    const columnTemplate: ScheduleHeaders[] = this.initializeHeaders(environment.columnHeaderTemplate);
    let i = 2;
    let dateContainer: moment.Moment = moment(weekStart);
    this.columnHeaders = columnTemplate;

    while (i < columnTemplate.length) {
      dateContainer = moment(weekStart); // need to do this because Moment actually changes the variable on add
      this.columnHeaders[i].columnText = `${columnTemplate[i].columnText} ${dateContainer.add((i - 2), 'days').format('MM/DD/YYYY')}`;
      i++;
    }
  }

  // This really needs to be moved out of here and into some type of factory or something. I'll figure that out later
  initializeHeaders(headerString: string): ScheduleHeaders[] {
    const columns = new Array<ScheduleHeaders>();
    const headers: string[] = headerString.split(",");
    for (const h of headers) {
      const col = new ScheduleHeaders();
      col.columnText = h;
      col.isColumnError = false;
      columns.push(col);
    }
    return columns;
  }

}
