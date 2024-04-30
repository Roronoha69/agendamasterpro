import { Injectable } from '@angular/core';
import { Observable, of, Subject  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import axios from 'axios';
import { Contact } from 'src/model/Contact';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() {  }
  
  private monObservable = new Subject<any>();

  public apiKey = 'patoaPnmA3wb6mjBZ.c7e3f2e25ea7b9f17cd410c08634ce5de6281550c3be4acb7970ba87d486f704';
  public tableId = 'appd56f4y5wizEu7x';
  public apiUrl = `https://api.airtable.com/v0/${this.tableId}`;
  
  public headers = {
    'Authorization': `Bearer ${this.apiKey}`
  };

  public currentUserId: string =''

  public currentAgandaId: string = ''

   /**
   * @params => login from current USER LOGIN 
   */
  public async getCurrentUserId(login: string){
    try {
      const response = await axios.get(`${this.apiUrl}/User`, { headers: this.headers })
      const currentUser = response.data.records.filter((record: { fields: { "login": string; }; }) => record.fields.login === login)
      
      this.getAgendaFromUserId(currentUser[0].id)
      return response.data;
    } catch (error) {
      console.error('Error fetching data from Airtable:', error);
      throw error;
    }
  }

  /**
  * @params => User ID
  * Retreive agenda for current user
  */
  public async getAgendaFromUserId(id:number) {    
    try {
      const response = await axios.get(`${this.apiUrl}/Agenda`, { headers: this.headers });
      const userAgenda = response.data.records.filter((record: { fields: { "User": any[]; }; }) => record.fields.User[0] === id)      
            
      this.getContactFromAgenda(userAgenda[0].id)
    } catch (error) {
      console.error('Error fetching data from Airtable:', error);
      throw error;
    }
  }

  /**
  * @params => Agenda ID
  * Get all the contacts from Agenda
  */
  public async getContactFromAgenda(id: number){
    try {
      const response = await axios.get(`${this.apiUrl}/Contact`, { headers: this.headers });
      const retreivedContact = response.data.records.filter((record: { fields: { "Agenda": any[]; }; }) => record.fields.Agenda[0] === id)      
      this.monObservable.next(retreivedContact);
      
      return response
    } catch (error) {
      console.error('Error fetching data from Airtable:', error);
      throw error;
    }
  }

  /**
  * Send Contacts for client component
  */
  public getContact(){
    return this.monObservable;
  }


  /**
  * @params => Data from form
  * POST new contact
  */
  public async addContact(newContact: Contact) {
    console.log("AMIGO",newContact);
    
    try {

      if (!this.validateEmail(newContact.email)) {
        throw new Error('Invalid email format');
      }
      console.log("went 1");


      if (!this.validatePhone(newContact.phone)) {
        throw new Error('Invalid phone number format');
      }

      console.log("went 2");

      if (!this.validateURL(newContact.website)) {
        throw new Error('Invalid website URL format');
      }

      console.log("went 3");

      const formatedContact = {
         'name': newContact.name,
         'addressAgregation': newContact.address,
         'linkAgregation': newContact.website,
         'numberAgregation': newContact.phone,
         'mailAgregation': newContact.email,
      }
      

      const response = await axios.post(`${this.apiUrl}/Contact`, formatedContact, { headers: this.headers });
      console.log(response);
      
      
      return response.data;
    } catch (error) {
      console.error('Error adding contact:', error);
      throw error;
    }
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  private validatePhone(phone: string): boolean {
    const phoneRegex = /^(\+[0-9]{1,3}[-. \s]?)?([0-9]{3}[-. \s]?)([0-9]{3}[-. \s]?)([0-9]{4})$/;
    return phoneRegex.test(phone);
  }

  private validateURL(url: string): boolean {
    const urlRegex = /\./;
    return urlRegex.test(url);
  }



}
