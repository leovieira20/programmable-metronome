import {Component, OnInit} from '@angular/core';
import {Scheduler} from '../../domain/entities/scheduler';
import {Programme} from '../../domain/entities/programme';
import {NoteResolution} from '../../domain/entities/noteResolution';

@Component({
    selector: 'scheduler',
    templateUrl: './scheduler.component.template.html'
})
export class SchedulerComponent implements OnInit {
    constructor(private scheduler: Scheduler) {
    }

    ngOnInit(): void {
        this.scheduler.addProgrammeSetup(new Programme(120, NoteResolution.SIXTEENTH, false, 4, 4));
    }
}
