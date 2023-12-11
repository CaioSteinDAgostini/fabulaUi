import { Injectable, Output, EventEmitter, } from '@angular/core';
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

  accountToken : Token | null = null;
  selectedAccount : Account | null = null;

  userToken : Token | null = null;
  outputUserToken = new EventEmitter<Token>();

  userClaims: Claims | null = null;
  accountClaims: Claims | null = null;

  availableDomains  : Domain[] | null= [];

  outputSelectedDomain = new EventEmitter<Domain>();

  private authenticationUrl = 'http://localhost:8080/api/authentication';
  private authorizationUrl = 'http://localhost:8080/api/authorization';

  constructor(private http: HttpClient, private accountsService : AccountService) {

  }

  postAuthorization(domainId: string){

    const headers = { 'Authorization': 'Bearer '+this.getUserToken()?.token };
    const body = null;// { title: 'Angular POST Request Example' };
    const params = { 'domainId' : domainId};

    this.http.post<Token>(this.authorizationUrl, body, { headers, params}).subscribe(accountToken => {
      this.accountToken = accountToken;
      this.accountClaims = this.decode(accountToken);

      this.outputSelectedDomain.emit(this.accountClaims.domain);

      this.accountsService.getAccount(this.accountToken).subscribe(account => {
        this.selectedAccount = account;
        
      });
    });
  }

  postAuthentication(paramUsername: string, paramPassword: string) {
     return this.http.post<Token>(this.authenticationUrl, { username: "root@domain.com", password: paramPassword }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).subscribe(token => {
      this.userToken = token;
      this.userClaims = this.decode(this.userToken);
      this.availableDomains = this.userClaims.domains; 
      this.outputUserToken.emit(token);
    });
    

    
  }

  getUserToken() : Token | null {
    return this.userToken;
  }

  getAccountToken() : Token | null {
    return this.accountToken;
  }

  getAccount(): Account | null {
    return this.selectedAccount;
  }

  getUserClaims() : Claims | null {
    return this.userClaims;
  }

  getAvailableDomains() : Domain[] | null {
    return this.availableDomains;
  }

  decode(token: Token): Claims {
    let parts: string[] = token.token.split('.');
    let claims = JSON.parse(Buffer.from(parts[1], 'base64').toString());
    return claims;
  }

  setAccountToken(accountToken : Token | null) {
    this.accountToken = accountToken;
  }

  isUserLogged() : boolean {
    return this.userToken!=null;
  }
}
