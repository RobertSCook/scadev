import { Component, Output, EventEmitter } from '@angular/core';
import {NgbDatepickerConfig, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sca-week-picker',
  templateUrl: './week-picker.component.html',
  styleUrls: ['./week-picker.component.css']
})
export class WeekPickerComponent {
  weekSelected: NgbDateStruct;
  @Output() selected = new EventEmitter<Date>();

  constructor(config: NgbDatepickerConfig) {
        // customize default values of datepickers used by this component tree
        // Because I already have knowledge of SCA, I'm not letting this go back too far, but I would normally ask if I didnt already know
        config.minDate = {year: 2000, month: 1, day: 1};
        config.maxDate = {year: 2019, month: 12, day: 31};

        // days that don't belong to current month are not visible
        config.outsideDays = 'hidden';

        // any day other than the first day of the week is disabled
        config.markDisabled = (date: NgbDateStruct) => {
          const d = new Date(date.year, date.month - 1, date.day);
          return d.getDay() !== 1;
        };
   }

   weekChange() {
     const stringDate = new Date(`${this.weekSelected.year}-${this.weekSelected.month}-${this.weekSelected.day}`);
     console.log(`About to emit ${stringDate}`);
     this.selected.emit(stringDate);
   }
}
