import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HotkeyModule} from 'angular2-hotkeys';
import {MaterializeModule} from 'angular2-materialize';
import {SchedulerComponent} from './components/scheduler/scheduler.component';
import {MetronomeComponent} from './components/metronome/metronome.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GlobalControlsComponent} from './components/global-controls/global-controls.component';
import {SchedulerItemComponent} from './components/scheduler/scheduler-item/scheduler-item.component';
import {SchedulerItemListComponent} from './components/scheduler/scheduler-item-list/scheduler-item-list.component';
import {SchedulerItemFormComponent} from './components/scheduler/scheduler-item-form/scheduler-item-form-component.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {MyProgramsComponent} from './components/program/my-programs/my-programs.component';
import {RouterModule, Routes} from '@angular/router';
import {ShellComponent} from './components/shell/ShellComponent';
import {MainComponent} from './components/main/main.component';
import {ParseProgramRepository} from './domain/services/ParseProgramRepository';
import {IProgramRepository} from './domain/services/IProgramRepository';
import {IUserRepository} from './domain/services/IUserRepository';
import {ParseUserRepository} from './domain/services/ParseUserRepository';
import {Bus} from './domain/entities/Bus';
import {AudioContextService} from './domain/entities/AudioContextService';
import {AudioListener} from './domain/listeners/audioListener';
import {environment} from '../environments/environment';

const appRoutes: Routes = [
  {path: 'my-programs', component: MyProgramsComponent},
  {path: '', component: MainComponent},
  {path: '**', redirectTo: ''}
];

const parse = require('parse');

@NgModule({
  declarations: [
    ShellComponent,
    MainComponent,
    SchedulerComponent,
    MetronomeComponent,
    GlobalControlsComponent,
    SchedulerItemComponent,
    SchedulerItemListComponent,
    SchedulerItemFormComponent,
    NavBarComponent,
    MyProgramsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HotkeyModule.forRoot(),
    HttpClientModule,
    MaterializeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    Bus,
    AudioContextService,
    AudioListener,
    {provide: IProgramRepository, useClass: ParseProgramRepository},
    {provide: IUserRepository, useClass: ParseUserRepository}
  ],
  bootstrap: [ShellComponent]
})
export class AppModule {

  constructor(bus: Bus,
              audioService: AudioContextService,
              audioListener: AudioListener) {
    parse.initialize(environment.parseAppId);
    parse.serverURL = environment.parseUrl;

    parse.FacebookUtils.init({
      appId: environment.facebookAppId,
      cookie: true,
      xfbml: true,
      version: 'v2.3'
    });
  }
}
