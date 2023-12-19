import { Injectable, Output, EventEmitter, OnInit, } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Token } from 'src/token';
import { Account } from 'src/app/accounts/account';
import { Buffer } from 'buffer';
import { Claims } from './claims';
import { User } from './user';
import { Domain } from '../domain/domain';
import { AccountService } from '../accounts/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  accountToken: Token | null = null;
  selectedAccount: Account | null = null;

  userToken: Token | null = null;
  outputUserToken = new EventEmitter<Token | null>();

  userClaims: Claims | null = null;
  accountClaims: Claims | null = null;

  availableDomains: Domain[] | null = [];

  outputSelectedDomain = new EventEmitter<Domain | null>();

  private authenticationUrl = 'http://localhost:8080/api/authentication';
  private authorizationUrl = 'http://localhost:8080/api/authorization';

  constructor(private http: HttpClient, private accountsService: AccountService) {
    let userToken = localStorage.getItem('userToken');
    if (userToken) {
      this.userToken = JSON.parse(userToken);
    }
    let userClaims = localStorage.getItem('userClaims');
    if (userClaims) {
      this.userClaims = JSON.parse(userClaims);
    }
    let availableDomains = localStorage.getItem('availableDomain');
    if (availableDomains) {
      this.availableDomains = JSON.parse(availableDomains);
    }

    let accountToken = localStorage.getItem('accountToken');
    if (accountToken) {
      this.accountToken = JSON.parse(accountToken);
    }
    let selectedAccount = localStorage.getItem('selectedAccount');
    if (selectedAccount) {
      this.selectedAccount = JSON.parse(selectedAccount);
    }
  }

  postAuthorization(domainId: string) {

    console.log('authservice post authorization');

    const headers = { 'Authorization': 'Bearer ' + this.getUserToken()?.token };
    const body = null;// { title: 'Angular POST Request Example' };
    const params = { 'domainId': domainId };

    this.http.post<Token>(this.authorizationUrl, body, { headers, params }).subscribe(accountToken => {
      this.accountToken = accountToken;
      localStorage.setItem('accountToken', JSON.stringify(accountToken))
      this.accountClaims = this.decode(accountToken);


      this.outputSelectedDomain.emit(this.accountClaims.domain);
      console.log('authservice emmited selected domain '+ this.accountClaims.domain.name);
      this.accountsService.getAccount(this.accountToken).subscribe(account => {
        this.selectedAccount = account;
        localStorage.setItem('selectedAccount', JSON.stringify(account))
      });
    });
  }

  postAuthentication(paramUsername: string, paramPassword: string) {
    return this.http.post<Token>(this.authenticationUrl, { username: "root@domain.com", password: paramPassword }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).subscribe(token => {
      this.userToken = token;
      localStorage.setItem('userToken', JSON.stringify(this.userToken));
      this.userClaims = this.decode(this.userToken);
      localStorage.setItem('userClaims', JSON.stringify(this.userClaims));
      this.availableDomains = this.userClaims.domains;
      localStorage.setItem('availableDomains', JSON.stringify(this.availableDomains));
      this.outputUserToken.emit(token);
    });



  }

  getUserToken(): Token | null {
    return this.userToken;
  }

  getAccountToken(): Token | null {
    return this.accountToken;
  }

  getAccount(): Account | null {
    return this.selectedAccount;
  }

  getUserClaims(): Claims | null {
    return this.userClaims;
  }

  getAvailableDomains(): Domain[] | null {
    return this.availableDomains;
  }

  decode(token: Token): Claims {
    let parts: string[] = token.token.split('.');
    let claims = JSON.parse(Buffer.from(parts[1], 'base64').toString());
    return claims;
  }

  setAccountToken(accountToken: Token | null) {
    this.accountToken = accountToken;
  }

  isUserLogged(): boolean {
    return this.userToken != null;
  }

  logout() {
    this.userToken = null;
    this.accountToken = null;
    this.availableDomains = null;
    this.selectedAccount = null;
    localStorage.clear();
    this.outputUserToken.emit(null);
    this.outputSelectedDomain.emit(null);
  }
}
