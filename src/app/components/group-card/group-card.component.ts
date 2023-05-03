import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss'],
})
export class GroupCardComponent implements OnInit {
  collapsed: boolean = true;
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() selected: boolean = false;
  @Output() toggle = new EventEmitter<boolean>();
  @Output() selectGroup = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  toggleCollapsed() {
    this.toggle.emit();
    this.collapsed = !this.collapsed;
  }

  toggleGroup() {
    this.selectGroup.emit();
  }
}
