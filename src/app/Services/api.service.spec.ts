import { TestBed } from '@angular/core/testing';
import axios from 'axios';
import { ApiService } from './api.service';
import { Contact } from 'src/model/Contact';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add contact', async () => {
    const newContact: Contact = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      website: 'https://www.example.com',
      address: '1 rue de république'
    };

    const axiosPostSpy = spyOn(axios, 'post').and.returnValue(Promise.resolve({ data: {} }));

    await service.addContact(newContact);

    expect(axiosPostSpy).toHaveBeenCalledWith(`${service.apiUrl}/Contact`, newContact, { headers: service.headers });
  });

  it('should throw error for invalid email', async () => {
 // EXEMPLE MAIL INVALIDE
     const invalidEmailContact: Contact = {
      name: 'John Doe',
      email: 'invalid-email',
      phone: '+1234567890',
      website: 'https://www.example.com',
      address: '1 rue de république'
    };

    try {
      await service.addContact(invalidEmailContact);
    } catch (error) {
      expect(error.message).toEqual('Invalid email format');
    }
  });
});
