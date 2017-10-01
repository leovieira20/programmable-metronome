import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './components/app/app.component';
import {HotkeyModule} from 'angular2-hotkeys';
import {MaterializeModule} from 'angular2-materialize';
import {SchedulerComponent} from './components/scheduler/scheduler.component';
import {MetronomeComponent} from './components/metronome/metronome.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GlobalControlsComponent } from './components/global-controls/global-controls.component';
import { SchedulerItemComponent } from './components/scheduler/scheduler-item/scheduler-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SchedulerComponent,
    MetronomeComponent,
    GlobalControlsComponent,
    SchedulerItemComponent
  ],
  imports: [
    BrowserModule,
    HotkeyModule.forRoot(),
    HttpClientModule,
    MaterializeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
