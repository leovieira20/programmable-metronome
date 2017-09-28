import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './components/app/app.component';
import {HotkeyModule} from 'angular2-hotkeys';
import {MaterializeModule} from 'angular2-materialize';
import {SchedulerComponent} from './components/scheduler/scheduler.component';
import {MetronomeComponent} from './components/metronome/metronome.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SchedulerComponent,
    MetronomeComponent
  ],
  imports: [
    BrowserModule,
    HotkeyModule.forRoot(),
    HttpClientModule,
    MaterializeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
