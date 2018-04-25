import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getFacilities();
  }

  getFacilities() {
    this.dataService.getLocations().subscribe((facs: FacilityResponse) => {
      this.facilities = facs.data;
    }, (errorMsg: string) => {
      alert(errorMsg); // TODO: Change this to a toaster or something
    }
  );
  }

  facilitySelected() {
    console.log(`About to emit ${this.selectedFacility.facilityId}`);
    this.selected.emit(this.selectedFacility);
  }

}
