import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import ResolutionOptions from '../../domain/entities/resolutionOptions';

@Component({
  selector: 'app-resolution-options',
  template: `
    <select materialize="material_select" (change)="resolutionChanged($event.target.value)" [ngModel]="selectedResolutionId">
      <option *ngFor="let option of resolutionOptions" [value]="option.id">{{option.name}}</option>
    </select>
  `
})
export class ResolutionOptionsComponent implements OnInit {
  resolutionOptions = ResolutionOptions;
  @Input() selectedResolutionId: number;
  @Output() onResolutionChanged = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
  }

  resolutionChanged(resolutionId: number) {
    this.onResolutionChanged.next(resolutionId);
  }
}
