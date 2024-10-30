import {Component, OnInit} from '@angular/core';
import {Sale} from '../../shared/models/sale';
import {HttpClient, HttpParams} from '@angular/common/http';
import {URLS} from '../../shared/urls';
import {Observable} from 'rxjs';
import {HttpOptions} from '../../shared/http/http-options';
import {MatTableModule} from '@angular/material/table';
import {MatCard} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-sale-list',
  standalone: true,
  imports:  [
    MatTableModule,
    MatCard,
    MatButton,
    MatFormFieldModule,
    MatInput,
    MatIconButton,
    MatIcon,
    FormsModule,
  ],
  templateUrl: './sale-list.component.html',
  styleUrl: './sale-list.component.css'
})
export class SaleListComponent implements OnInit {
  public dataSource: Sale[] = [];
  public displayedColumns: string[] = [
    'id',
    'client',
    'cpf_client',
    'product',
    'employee',
    'registration_employee',
    'nrf',
  ];
  public searchClient: string = '';
  public searchCpf_client: string = '';
  public searchProduct: string = '';
  public searchEmployee: string = '';
  public searchRegistration_employee: string = '';
  public searchNrf: string = '';
  private parameters: HttpParams = new HttpParams();

  constructor(private http: HttpClient) {

  }

  public ngOnInit(): void {
    this.search();
  }

  public search(resetIndex: boolean = false): void {
    this.clearParameter();
    this.addParameter('client', this.searchClient);
    this.addParameter('cpf_client', this.searchCpf_client);
    this.addParameter('product', this.searchProduct);
    this.addParameter('employee', this.searchEmployee);
    this.addParameter('registration_employee', this.searchRegistration_employee);
    this.addParameter('nrf', this.searchNrf);
    this.getAll<Sale>(URLS.SALE).subscribe({
      next: (data: Sale[]) => {
        this.dataSource = data;

      },
      error: (_err) => {
        console.error('Error loading products');
      }

    });
  }

  public getAll<T>(route: string): Observable<T[]> {
    const url = `${URLS.BASE}${route}`;
    return this.http.get<T[]>(url, this.getOptions());
  }


  public addParameter(key: string, value: string): void {
    this.parameters = this.parameters.set(key, value);
  }

  public clearParameter(): void {
    this.parameters = new HttpParams();
  }

  public getOptions(): HttpOptions {
    const httpOptions: HttpOptions = {};
    if (this.parameters) {
      httpOptions.params = this.parameters;
    }
    return httpOptions;
  }
}
