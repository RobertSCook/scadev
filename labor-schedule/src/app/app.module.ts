import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { AppBootstrapModule } from 'app-bootstrap/app-bootstrap.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectModule } from 'ng2-select';

import { AppComponent } from './app.component';
import { FacilityComponent } from './facility/facility.component';
import { LaborListComponent } from './labor-list/labor-list.component';
import { DataService } from './data.service';


@NgModule({
  declarations: [
    AppComponent,
    FacilityComponent,
    LaborListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    SelectModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
