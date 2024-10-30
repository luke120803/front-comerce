import {Component, OnInit} from '@angular/core';
import {Employee} from '../../shared/models/employee';
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
  selector: 'app-employee-list',
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
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  public dataSource: Employee[] = [];
  public displayedColumns: string[] = ['id', 'name', 'registration',];
  public searchNameEmployee: string = '';
  public searchRegistration: string = '';
  private parameters: HttpParams = new HttpParams();

  constructor(private http: HttpClient) {

  }

  public ngOnInit(): void {
    this.search();
  }

  public search(resetIndex: boolean = false): void {
    this.clearParameter();
    this.addParameter('name', this.searchNameEmployee);
    this.addParameter('registration', this.searchRegistration);
    this.getAll<Employee>(URLS.EMPLOYEE).subscribe({
      next: (data: Employee[]) => {
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
