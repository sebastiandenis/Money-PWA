import { Component, OnInit, Input } from '@angular/core';
import { Shift } from '../../models/shift.model';

@Component({
  selector: 'app-shifts-list',
  templateUrl: './shifts-list.component.html',
  styleUrls: ['./shifts-list.component.scss']
})
export class ShiftsListComponent implements OnInit {
  @Input() shifts: Shift[] = [];

  constructor() {}

  ngOnInit() {}

  getSortedShifts(shifts: Shift[]): Shift[] {
    return shifts
      .sort((a: Shift, b: Shift) => {
        // desc
        if (a.when < b.when) {
          return 1;
        } else if (a.when === b.when) {
          return 0;
        } else {
          return -1;
        }
      })
      .slice();
  }

  getShortDesc(desc: string): string {
    let shortDesc = '';
    if (desc) {
      shortDesc = desc.substr(0, 30);
      if (desc.length > 30) {
        shortDesc = shortDesc + '...';
      }
    }

    return shortDesc;
  }

  getBadgeColor(amount: number) {
    if (amount) {
      if (amount < 0) {
        return { 'my-chip-red': true };
      } else {
        return { 'my-chip-green': true };
      }
    }
  }
}
