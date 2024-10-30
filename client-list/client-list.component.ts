import {Component, OnInit} from '@angular/core';
import {Client,} from '../../shared/models/client';
import {HttpClient, HttpParams} from '@angular/common/http';
import {URLS} from '../../shared/urls';
import {Observable} from 'rxjs';
import {HttpOptions} from '../../shared/http/http-options';
import {MatCard} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatFormFieldModule, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {
  MatCell,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatRow,
  MatTable, MatTableModule
} from '@angular/material/table';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatCard,
    MatButton,
    MatFormFieldModule,
    MatInput,
    MatIconButton,
    MatIcon,
    FormsModule,
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit {
  public dataSource: Client[] = [];
  public displayedColumns: string[] = ['id', 'name', 'age', 'cpf', 'rg'];
  public searchName: string = '';
  public searchAge: string = '';
  public searchCpf: string = '';
  public searchRg: string = '';
  private parameters: HttpParams = new HttpParams();

  constructor(private http: HttpClient) {

  }

  public ngOnInit(): void {
    this.search();
  }

  public search(resetIndex: boolean = false): void {
    this.clearParameter();
    this.addParameter('name', this.searchName);
    this.addParameter('age', this.searchAge);
    this.addParameter('cpf_sw', this.searchCpf);
    this.addParameter('rg', this.searchRg);
    this.getAll<Client>(URLS.CLIENT).subscribe({
      next: (data: Client[]) => {
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





