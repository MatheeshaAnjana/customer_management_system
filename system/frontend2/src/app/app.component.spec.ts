/// <reference types="jasmine" />

import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the Clientory login shell', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand')?.textContent).toContain('clientory');
  });

  it('should require exactly 10 numeric phone digits', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const phone = fixture.componentInstance.customerForm.controls.phone;

    phone.setValue('123456789');
    expect(phone.invalid).toBeTrue();
    expect(phone.hasError('pattern')).toBeTrue();

    phone.setValue('1234567890');
    expect(phone.valid).toBeTrue();

    phone.setValue('123456789a');
    expect(phone.invalid).toBeTrue();
    expect(phone.hasError('pattern')).toBeTrue();
  });
});
