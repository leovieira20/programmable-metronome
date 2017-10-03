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
import { SchedulerItemListComponent } from './components/scheduler/scheduler-item-list/scheduler-item-list.component';
import { SchedulerItemFormComponent } from './components/scheduler/scheduler-item-form/scheduler-item-form-component.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {AngularFireModule} from 'angularfire2';
import {FirebaseConfig} from './domain/config/FirebaseConfig';
import {AngularFireAuthModule} from 'angularfire2/auth';

@NgModule({
  declarations: [
    AppComponent,
    SchedulerComponent,
    MetronomeComponent,
    GlobalControlsComponent,
    SchedulerItemComponent,
    SchedulerItemListComponent,
    SchedulerItemFormComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    HotkeyModule.forRoot(),
    HttpClientModule,
    MaterializeModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
