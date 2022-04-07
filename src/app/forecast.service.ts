import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private http: HttpClient) { }
  getWeatherForecast() {
    return new Observable((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position)
        },
        (error) => {
          observer.error(error)
        }
      )
    }).pipe(
      map((value: any) => {
        return new HttpParams()
          .set('lon', value.coords.longitude)
          .set('lat', value.coords.latitude)
          .set('units', 'metric')
          .set('appid', 'ce39f728785dc45e16a7fe5cc17a819e')
      }),
      switchMap((__values))=> {
      return this.http.get('https://api.openweathermap.org/data/2.5/forecast', { params: __values })
    },
  }
}
