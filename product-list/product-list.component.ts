import {Component, OnInit} from '@angular/core';
import {Product} from '../../shared/models/product';
import {MatTableModule} from '@angular/material/table';
import {MatCard} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {URLS} from '../../shared/urls';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {HttpOptions} from '../../shared/http/http-options';

@Component({
  selector: 'app-product-list',
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
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  public dataSource: Product[] = [];
  public displayedColumns: string[] = ['id', 'description', 'quantity'];
  public searchValue: string = '';
  public searchQtd: string = '';
  private parameters: HttpParams = new HttpParams();

  constructor(private http: HttpClient) {

  }

  public ngOnInit(): void {
    this.search();
  }

  public search(resetIndex: boolean = false): void {
    this.clearParameter();
    this.addParameter('description', this.searchValue);
    this.addParameter('quantity_gt', this.searchQtd);
    this.getAll<Product>(URLS.PRODUCT).subscribe({
      next: (data: Product[]) => {
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
