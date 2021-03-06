import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { User } from './../models/users';
import { UserService } from './../services/users';

@Component({
  selector: 'users',
  template: `
    <h1>Users</h1>
    <ng2-smart-table
      [settings]="settings"
      [source]="source"
      (createConfirm)="add($event)">
    </ng2-smart-table>
	`,
  styles: [``]
})
export class UserComponent implements OnInit {
  source: LocalDataSource;
  users: User[];
  settings = {
    columns: {
      Name: { title: 'User Name' },
      Email: { title: 'Email' },
      Position: { title: 'Position' }
    },
    pager: {
			perPage: 100
    },
    mode: 'inline',
    add: {
      confirmCreate: true
    }
  };

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().then(users => {
      this.users = users;
      this.source = new LocalDataSource(this.users);
    });
  }

  onSelect(user: User): void {
    console.log('Selected', user);
  }

  add(e: any) {
    console.log('Add', e);
    this.userService.addUser(e.newData)
      .then(() => e.confirm.resolve(e.newData));
  }
}
