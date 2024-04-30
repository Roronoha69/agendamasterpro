import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  // fetchDataFromAirtable() {
  //   const apiKey = 'patoaPnmA3wb6mjBZ.c7e3f2e25ea7b9f17cd410c08634ce5de6281550c3be4acb7970ba87d486f704';
  //   const tableId = 'YOUR_TABLE_ID';
  //   const apiUrl = `https://api.airtable.com/v0/${tableId}/YourTable`;

  //   const headers = {
  //     'Authorization': `Bearer ${apiKey}`
  //   };

  //   return axios.get(apiUrl, { headers })
  //     .then(response => response.data)
  //     .catch(error => {
  //       console.error('Error fetching data from Airtable:', error);
  //       throw error;
  //     });
  // }

  public getUsers(){
    console.log("hello");
    
  }
}
