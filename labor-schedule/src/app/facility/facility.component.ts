import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Facility } from '../models/facility';
import { FacilityResponse } from '../models/facility-response';
import { DataService } from '../data.service';

@Component({
  moduleId: module.id,
  selector: 'sca-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.css']
})
export class FacilityComponent implements OnInit {
  facilities: Facility[];
  selectedFacility: Facility;
  @Output() selected = new EventEmitter<Facility>();
  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  selectedFacilityTerm: string;


  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getFacilities();
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.focus$)
      .merge(this.click$.filter(() => !this.instance.isPopupOpen()))
      .map(term => (term === '' ? this.facilities.map(f => f.facilityDisplayName) : this.facilities.map(f => f.facilityDisplayName)
                                                    .filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1))
                                                    .slice(0, 10))

  getFacilities() {
    this.dataService.getLocations().subscribe((facs: FacilityResponse) => {
      this.facilities = facs.data;
      this.facilities.forEach(f => f.facilityDisplayName = f.facilityId + ' - ' + f.facilityName);
    }, (errorMsg: string) => {
      alert(errorMsg); // TODO: Change this to a toaster or something
    }
  );
  }

  facilitySelected(item) {
     // TODO: Need to clean this up, too assumptive
    this.selectedFacility = this.facilities.filter(f => f.facilityDisplayName.toLowerCase().indexOf(item.item))[0];

    this.selected.emit(this.selectedFacility);
  }

}
