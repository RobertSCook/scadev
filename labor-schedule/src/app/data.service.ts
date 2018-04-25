import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Facility } from './models/facility';
import { FacilityResponse } from './models/facility-response';
import { TeammateSchedule } from './models/teammate-schedule';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { TeammateScheduleResponse } from './models/teammate-schedule-response';
import { environment } from '../environments/environment';


@Injectable()
export class DataService {
  private locationsUrl = environment.locationsUrl;
  private teammateScheduleUrl = environment.teammateScheduleUrl;

  constructor(
    private http: HttpClient
  ) { }

  // TODO: Get better logging for errors
  getLocations(): Observable<FacilityResponse> {
    return this.http.get<FacilityResponse>(this.locationsUrl)
      .do((facs) => {
        console.log(`Got ${facs.data.length} facilities`);
      })
      .catch((error: any) => {
        console.log(`Error occured in getLocations: ${error}`);
        return Observable.throw('Something went wrong trying to get facilities');
      });
  }

  // TODO: Get better logging for errors
  getTeammateSchedule(facilityId: string, day: string): Observable<TeammateScheduleResponse> {
  //  const serviceParams = new HttpParams()
  //                .set('facilityId', facilityId)
  //                .set('day', day);
    return this.http.get<TeammateScheduleResponse>(`${this.teammateScheduleUrl}/${facilityId}/${day}`)
      .do((teams) => {
        console.log(`Got ${teams.data.length} teammate schedules`);
      })
      .catch((error: any) => {
        console.log(`Error occured in getTeammateSchedule: ${error}`);
        return Observable.throw('Something went wrong trying to get the teammate schedules');
      });
  }
}
