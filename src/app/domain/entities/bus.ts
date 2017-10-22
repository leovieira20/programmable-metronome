import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';

@Injectable()
export class Bus {
    tickChannel: Subject<any> = new Subject();
    gainChannel: Subject<number> = new Subject();
    playbackStateChannel: Subject<boolean> = new Subject();
}
