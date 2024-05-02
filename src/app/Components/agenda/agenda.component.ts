import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import {switchMap, tap} from "rxjs";

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})

export class AgendaComponent implements OnInit{
  public displayedColumns: string[] = ['Nom', 'Mail', 'Tél', 'Website', 'Adresse'];
  public dataSource: MatTableDataSource<any>;
  public users: any[] = [];

  constructor(
    public apiService: ApiService
  ){
    const users: any[] = this.users;
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(): void {
    /**
     * Fake login with joe as ID
     * Send Login ID to service
     */
      this.apiService.getCurrentUserId("joe")
      
    /**
     * Fetch data from services 
     */
      this.apiService.getContact().subscribe(data => {
        this.users = data;
        this.dataSource = new MatTableDataSource(data);  
      });
  }
}
