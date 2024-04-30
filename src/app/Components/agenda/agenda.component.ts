import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})


export class AgendaComponent implements OnInit{
  
  constructor(
    public apiService: ApiService
  ){}

  ngOnInit(): void {
      this.apiService.getUsers()
  }
}
