import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customer, CustomerInput, CustomerStatus } from './models/customer.model';
import { CustomerService } from './services/customer.service';

@Component({
  selector: 'app-root',
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly customerService = inject(CustomerService);
  private readonly formBuilder = inject(FormBuilder);
  theme = (localStorage.getItem('clientory-theme') as 'light' | 'dark') || 'light';
  isAuthenticated = localStorage.getItem('clientory-authenticated') === 'true';
  customers: Customer[] = [];
  isLoading = false;
  isSaving = false;
  error = '';
  query = '';
  statusFilter: 'all' | CustomerStatus = 'all';
  formOpen = false;
  editingCustomer: Customer | null = null;
  deleteTarget: Customer | null = null;
  loginError = '';

  loginForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  customerForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required], email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required], address: ['', Validators.required], status: ['active' as CustomerStatus, Validators.required]
  });

  get visibleCustomers(): Customer[] {
    const search = this.query.trim().toLowerCase();
    return this.customers.filter((customer) => `${customer.name} ${customer.email} ${customer.phone}`.toLowerCase().includes(search)
      && (this.statusFilter === 'all' || customer.status === this.statusFilter));
  }

  get activeCount(): number { return this.customers.filter((customer) => customer.status === 'active').length; }

  ngOnInit(): void { if (this.isAuthenticated) this.loadCustomers(); }

  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('clientory-theme', this.theme);
  }

  login(): void {
    this.loginError = '';
    const { email, password } = this.loginForm.getRawValue();
    if (email.trim().toLowerCase() !== 'admin@gmail.com' || password !== '0000') { this.loginError = 'The email or password is incorrect.'; return; }
    localStorage.setItem('clientory-authenticated', 'true');
    this.isAuthenticated = true;
    this.loadCustomers();
  }

  logout(): void { localStorage.removeItem('clientory-authenticated'); this.isAuthenticated = false; }

  async loadCustomers(): Promise<void> {
    this.isLoading = true; this.error = '';
    try { this.customers = await this.customerService.getAll(); }
    catch (error) { this.error = this.customerService.getErrorMessage(error, 'Unable to load customers.'); }
    finally { this.isLoading = false; }
  }

  openCreateForm(): void {
    this.editingCustomer = null;
    this.customerForm.reset({ name: '', email: '', phone: '', address: '', status: 'active' });
    this.formOpen = true;
  }

  openEditForm(customer: Customer): void {
    this.editingCustomer = customer;
    this.customerForm.reset({ name: customer.name, email: customer.email, phone: customer.phone, address: customer.address, status: customer.status });
    this.formOpen = true;
  }

  async saveCustomer(): Promise<void> {
    if (this.customerForm.invalid) { this.customerForm.markAllAsTouched(); return; }
    this.isSaving = true; this.error = '';
    const values = this.customerForm.getRawValue() as CustomerInput;
    try {
      if (this.editingCustomer) await this.customerService.update(this.editingCustomer.id, values);
      else await this.customerService.create(values);
      await this.loadCustomers(); this.formOpen = false;
    } catch (error) { this.error = this.customerService.getErrorMessage(error, 'Unable to save customer.'); }
    finally { this.isSaving = false; }
  }

  async confirmDelete(): Promise<void> {
    if (!this.deleteTarget) return;
    this.error = '';
    try {
      const id = this.deleteTarget.id;
      await this.customerService.remove(id);
      this.customers = this.customers.filter((customer) => customer.id !== id); this.deleteTarget = null;
    } catch (error) { this.error = this.customerService.getErrorMessage(error, 'Unable to delete customer.'); }
  }

  formatDate(value: string): string { return value ? new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value)) : '-'; }

  fieldInvalid(field: keyof typeof this.customerForm.controls): boolean {
    const control = this.customerForm.controls[field];
    return control.invalid && (control.dirty || control.touched);
  }
}
