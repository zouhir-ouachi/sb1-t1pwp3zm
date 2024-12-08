import { Client, ExternalClient } from '../types';

export const mockClients: Client[] = [
  {
    matricule: "CLI001",
    companyName: "Solutions Tech SARL",
    bankAccounts: [
      { label: "Compte Principal", routingNumber: "021000021", accountNumber: "1234567890" },
      { label: "Compte Secondaire", routingNumber: "021000022", accountNumber: "0987654321" }
    ]
  },
  {
    matricule: "CLI002",
    companyName: "Innovations Digitales SA",
    bankAccounts: [
      { label: "Compte Opérations", routingNumber: "021000023", accountNumber: "5678901234" }
    ]
  }
];

export const mockExternalClients: ExternalClient[] = [
  {
    ice: "ICE001234567",
    companyName: "Services Globaux SA",
    bankAccounts: [
      { label: "Compte Principal", routingNumber: "021000024", accountNumber: "1122334455" }
    ]
  },
  {
    ice: "ICE007654321",
    companyName: "Commerce International SARL",
    bankAccounts: [
      { label: "Compte Principal", routingNumber: "021000025", accountNumber: "6677889900" },
      { label: "Compte Investissement", routingNumber: "021000026", accountNumber: "1122334455" }
    ]
  }
];