import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private http: HttpClient) {}

  getCountries() {
    return this.http
      .get<any[]>('https://restcountries.com/v3.1/lang/spanish')
      .pipe(
        map((resp: any[]) => {
          return resp.map((pais) => ({
            nombre: pais.name.common,
            codigo: pais.cca3,
          }));
        })
      );
  }

  // return this.http.get('https://www.themealdb.com/api/json/v1/1/random.php');

  getBurgers() {
    const headers = new HttpHeaders({
      Authorization: 'Access-Control-Allow-Origin'
    })

    return this.http.get('https://www.fruityvice.com/api/fruit/all', { headers });
    
  }
}
