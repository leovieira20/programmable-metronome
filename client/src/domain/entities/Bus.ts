import { Subject } from 'rxjs';
import { injectable } from 'inversify';

@injectable()
export class Bus {
    tickChannel: Subject<any> = new Subject();
    gainChannel: Subject<number> = new Subject();
    playbackStateChannel: Subject<boolean> = new Subject();
}
