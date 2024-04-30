import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() {  }
  

  public apiKey = 'patoaPnmA3wb6mjBZ.c7e3f2e25ea7b9f17cd410c08634ce5de6281550c3be4acb7970ba87d486f704';
  public tableId = 'appd56f4y5wizEu7x';
  public apiUrl = `https://api.airtable.com/v0/${this.tableId}`;
  
  public agendaId: number | undefined;
  
  public headers = {
    'Authorization': `Bearer ${this.apiKey}`
  };


  public getUsers(){
    return axios.get(`${this.apiUrl}/User`, { headers: this.headers })
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching data from Airtable:', error);
        throw error;
      });
  }

  public getAgenda(){
    
    axios.get(`${this.apiUrl}/Agenda`, { headers: this.headers })
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching data from Airtable:', error);
        throw error;
      });
  }

}
