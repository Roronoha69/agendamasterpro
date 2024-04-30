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



  public async getCurrentUserId(login: string){
    try {
      const response = await axios.get(`${this.apiUrl}/User`, { headers: this.headers })

      const currentUser = response.data.records.filter((record: { fields: { "login": string; }; }) => record.fields.login === login)
      // console.log("TANGO => ", currentUser[0].id);
      
      this.getAgendaFromUserId(currentUser[0].id)
      return response.data;
    } catch (error) {
      console.error('Error fetching data from Airtable:', error);
      throw error;
    }
  }


  public async getAgendaFromUserId(id:number) {
    console.log('USER ID => ', id);
    
    try {
      const response = await axios.get(`${this.apiUrl}/Agenda`, { headers: this.headers });
      const userAgenda = response.data.records.filter((record: { fields: { "User": any[]; }; }) => record.fields.User[0] === id)      
      
      console.log('USER AGENDA => ', userAgenda);
      
      this.getContactFromAgenda(userAgenda[0].id)

      return userAgenda    
    } catch (error) {
      console.error('Error fetching data from Airtable:', error);
      throw error;
    }
  }

  public async getContactFromAgenda(id: number){
    console.log('CONTACT ID => ', id);
    
    try {
      const response = await axios.get(`${this.apiUrl}/Contact`, { headers: this.headers });
      
      const userListTest = response.data.records.filter((record: { fields: { "Agenda": any[]; }; }) => record.fields.Agenda[0] === id)      
      console.log("USERLIST => ", userListTest);
                     
      return response
    } catch (error) {
      console.error('Error fetching data from Airtable:', error);
      throw error;
    }
  }

}
