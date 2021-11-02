import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-location',
  templateUrl: './select-location.component.html',
  styleUrls: ['./select-location.component.scss']
})
export class SelectLocationComponent implements OnInit {

  @Input() disabled = false;
  @Output() startSelect = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  initiateSelect() {
    this.startSelect.emit();
  }

}
