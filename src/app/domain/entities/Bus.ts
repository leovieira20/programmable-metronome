import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';

@Injectable()
export class Bus {
    public tickChannel: Subject<any> = new Subject();
    public gainChannel: Subject<number> = new Subject();
}
