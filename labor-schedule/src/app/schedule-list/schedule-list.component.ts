import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { environment } from '../../environments/environment';

import { TeammateSchedule } from '../models/teammate-schedule';
import { DataService } from '../data.service';
import { Facility } from '../models/facility';
import { TeammateScheduleResponse } from '../models/teammate-schedule-response';
import { ScheduleHeaders } from '../models/schedule-headers';
import { ListCriteria } from '../models/list-criteria';

@Component({
  selector: 'sca-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit, OnChanges {

  scheduleList: TeammateSchedule[];
  columnHeaders: ScheduleHeaders[];
  stringWeek: string;
  loadingList = false;
  @Input() listCriteria: ListCriteria;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.listCriteria) {
      this.getTeammateScheduleList(this.listCriteria.facility, this.listCriteria.weekStart);
    }
  }

  getTeammateScheduleList(facility: Facility, weekStart: Date) {
    this.loadingList = true;
    this.stringWeek = `${weekStart.getFullYear}-${weekStart.getMonth}-${weekStart.getDay}`;
    this.dataService.getTeammateSchedule(facility.facilityId, this.stringWeek).subscribe((response: TeammateScheduleResponse) => {
      this.scheduleList = response.data;
      this.writeColumns(weekStart, this.scheduleList);
    }, (errorMsg: string) => {
      alert(errorMsg); // TODO: Change this to a toaster or something
    });

    this.loadingList = false;
  }

  processANES(schedule: TeammateSchedule[], columnName: string): boolean {
    let numOff = 0;

    for (const a of schedule) {
      // There has to be a better way to do this, I don't like it
      if (columnName.toUpperCase() === 'MONDAY' && a.monday.toUpperCase() === 'OFF') { numOff++; }
      if (columnName.toUpperCase() === 'TUESDAY' && a.tuesday.toUpperCase() === 'OFF') { numOff++; }
      if (columnName.toUpperCase() === 'WEDNESDAY' && a.wednesday.toUpperCase() === 'OFF') {numOff++; }
      if (columnName.toUpperCase() === 'THURSDAY' && a.thursday.toUpperCase() === 'OFF') { numOff++; }
      if (columnName.toUpperCase() === 'FRIDAY' && a.friday.toUpperCase() === 'OFF') { numOff++; }
      if (columnName.toUpperCase() === 'SATURDAY' && a.saturday.toUpperCase() === 'OFF') { numOff++; }
      if (columnName.toUpperCase() === 'SUNDAY' && a.sunday.toUpperCase() === 'OFF') { numOff++; }
    }

    return (numOff >= 2);
  }

  // I feel like we are getting to the point where I need to break the columns out into a separate
  // component, but that isnt making a lot of sense to me at the moment
  writeColumns(weekStart: Date, schedule: TeammateSchedule[]) {
    const columnTemplate: ScheduleHeaders[] = this.initializeHeaders(environment.columnHeaderTemplate);
    let i = 2;
    let dateContainer: moment.Moment = moment(weekStart);
    this.columnHeaders = columnTemplate;
    const anesList: TeammateSchedule[] = schedule.filter(s => s.teammateType === 'Anesthesia');

    while (i < columnTemplate.length) {
      dateContainer = moment(weekStart); // need to do this because Moment actually changes the variable on add
      this.columnHeaders[i].isColumnError = this.processANES(anesList, columnTemplate[i].columnText);
      this.columnHeaders[i].columnText = `${columnTemplate[i].columnText} ${dateContainer.add((i - 2), 'days').format('MM/DD/YYYY')}`;
      i++;
    }
  }

  // This really needs to be moved out of here and into some type of factory or something. I'll figure that out later
  initializeHeaders(headerString: string): ScheduleHeaders[] {
    const columns = new Array<ScheduleHeaders>();

    const headers: string[] = headerString.split(',');
    for (const h of headers) {
      const col = new ScheduleHeaders();
      col.columnText = h;
      col.isColumnError = false;
      columns.push(col);
    }
    return columns;
  }

}
