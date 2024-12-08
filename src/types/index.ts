export interface Client {
  matricule: string;
  companyName: string;
  bankAccounts: BankAccount[];
}

export interface ExternalClient {
  ice: string;
  companyName: string;
  bankAccounts: BankAccount[];
}

export interface BankAccount {
  label: string;
  routingNumber: string;
  accountNumber: string;
}