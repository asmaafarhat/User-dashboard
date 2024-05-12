import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = "https://reqres.in/api/users"

  constructor(
    private http: HttpClient,
  ) { }

  getAllUsers(i: any) {
    return this.http.get(`${this.baseUrl}?page=${i}`).pipe(
      catchError(this.HandleError('getUsers', []))
    )
  }

  getUser(id: number) : Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.HandleError('getUser'))
    )
  }

  private HandleError<T>(operation = "operation", result?: T){
    return (error: any) : Observable<T> => {
      console.log('user not found')
      return of(result as T)
    }
  }
}
