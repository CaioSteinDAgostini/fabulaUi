import { Injectable, Output, EventEmitter, } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Token } from 'src/token';
import { Account } from 'src/app/accounts/account';
import { Buffer } from 'buffer';
import { Claims } from './claims';
import { User } from './user';
import { Domain } from '../domain/domain';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  accountToken : Token | null = null;
  selectedAccount : Account | null = null;

  userToken : Token | null = null;
  outputUserToken = new EventEmitter<Token>();

  userClaims: Claims | null = null;

  selectedUser : User | null = null;
  availableDomains  : Domain[] | null= [];

  private authenticationUrl = 'http://localhost:8080/api/authentication';
  private authorizationUrl = 'http://localhost:8080/api/authorization';

  constructor(private http: HttpClient) {

  }

  postAuthorization(jwt: Token, domainId: string): Observable<Token> {

    const headers = { 'Authorization': 'Bearer '+jwt.token };
    const body = null;// { title: 'Angular POST Request Example' };
    const params = { 'domainId' : domainId};
    return this.http.post<Token>(this.authorizationUrl, body, { headers, params});
  }

/*   postAuthentication(paramUsername: string, paramPassword: string): Observable<Token> {
    return this.http.post<Token>(this.authenticationUrl, { username: 'root@domain.com', password: paramPassword }, {
//      return this.http.post<Token>(this.authenticationUrl, { username: paramUsername, password: paramPassword }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  } */
  postAuthentication(paramUsername: string, paramPassword: string) {
     return this.http.post<Token>(this.authenticationUrl, { username: "root@domain.com", password: paramPassword }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).subscribe(token => {
      this.userToken = token;
      console.log("/n/n authservice got token "+token.token);
      this.userClaims = this.decode(this.userToken);
      this.availableDomains = this.userClaims.domains; 
      this.outputUserToken.emit(token);
    });
    

    
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
}
