export type CustomerStatus = 'active' | 'inactive';

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: CustomerStatus;
  createdDate: string;
}

export type CustomerInput = Omit<Customer, 'id' | 'createdDate'>;
