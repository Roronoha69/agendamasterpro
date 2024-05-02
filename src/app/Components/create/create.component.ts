import { Component } from '@angular/core';
// import { Contact } from '../models/contact.model';
import { ApiService } from 'src/app/Services/api.service';
import { Contact } from 'src/model/Contact';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  newContact: Contact = {
    name: '',
    email: '',
    phone: '',
    address: '',
    website: '',
  };

  constructor(private apiService: ApiService) {}

  createContact() {
    if (this.newContact.name && this.newContact.email && this.newContact.phone) {
      this.apiService.addContact(this.newContact);
      this.newContact = { name: '', email: '', phone: '', website: '', address: '' };
    } else {
      alert('Veuillez remplir tous les champs !');
    }
  }
}
