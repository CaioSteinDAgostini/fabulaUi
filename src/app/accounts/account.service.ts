import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from 'src/token';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {

  }
  getAccount(accountJwt: Token): Observable<Account> {

    const headers = { 'Authorization': 'Bearer '+accountJwt.token };
    return this.http.get<Account>(this.accountUrl+"/accounts",  { headers});
  }
}
