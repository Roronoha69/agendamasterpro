import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})


export class AgendaComponent implements OnInit{
  displayedColumns: string[] = ['Nom', 'Mail', 'Tél', 'Website', 'Adresse'];
  dataSource: MatTableDataSource<any>;
  users: any[] = [];

  constructor(
    public apiService: ApiService
  ){
    const users: any[] = [
      {name: 'John Doe', age: 30},
      {name: 'Jane Smith', age: 25},
    ];

    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(): void {
      this.getUsers()
  }

  getUsers() {
    this.apiService.getUsers()
      .then(data => {
        this.users = data;
        console.log('Users:', this.users);
      })
      .catch(error => {

      });
  }
}
