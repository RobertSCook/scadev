import { Component } from '@angular/core';

import { TeammateSchedule } from './models/teammate-schedule';
import { Facility } from './models/facility';
import { ListCriteria } from './models/list-criteria';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';

@Component({
  selector: 'sca-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sca';
  errorMsg: string; // TODO: Need to bubble up errors to this level...maybe?
  format: string;
  model;
  schedule: TeammateSchedule[];
  week: Date;
  facility: Facility;
  criteria: ListCriteria;

  getSchedule() {
    console.log('getSchedule fired');
  }

  facilitySelect(selectedFacility: Facility) {
    console.log(`The facility ${selectedFacility.facilityName} was selected`);
    this.facility = selectedFacility;
  }

  weekSelect(selectedWeek: Date) {
    console.log(`The selected week is ${selectedWeek.getDay()}`);
    this.week = selectedWeek;
  }

  submit() {
    this.criteria = { weekStart: this.week, facility: this.facility};
  }
}
