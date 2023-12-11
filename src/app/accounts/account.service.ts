import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from 'src/token';
import { Account } from './account';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {

  }
  getAccount(accountToken : Token): Observable<Account> {

    const headers = { 'Authorization': 'Bearer '+accountToken.token };
    return this.http.get<Account>(this.accountUrl+"/accounts",  { headers});
  }
}
