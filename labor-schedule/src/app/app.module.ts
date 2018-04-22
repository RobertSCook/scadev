import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { AppBootstrapModule } from 'app-bootstrap/app-bootstrap.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
