import { Component, OnInit, Input } from '@angular/core';
import { Domain } from 'src/app/domain/domain';
import { AuthService } from '../auth/auth.service';
import { AccountService } from '../accounts/account.service';
import { Token } from 'src/token';
import { Claims } from '../auth/claims';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {


  _switchDomains: Boolean = false;


  constructor(private authService: AuthService, private accountsService: AccountService) {

    this.authService.outputUserToken.subscribe(
      (userToken: Token) => {
        this.authService.getAvailableDomains();
        let availableDomains = authService.getAvailableDomains();
        if (availableDomains) {
          let rootDomain = availableDomains.find((element) => element.root);
          if (rootDomain?.id) {
            this.connectToDomain(rootDomain.id);
          }
        }
      }
    );
  }


  connectToDomain(domainId: string): void {
    if (this.authService.getUserToken()) {
      this.authService.postAuthorization(domainId);
   }
    else {
      throw new Error();
    }
  }


  switchDomains() {
    this._switchDomains = !this._switchDomains;
  }

  getAvailableDomains() : Domain[] | null {
    let answer = this.authService.getAvailableDomains();
    return answer;
  }

  isUserLogged() : boolean {
    return this.authService.isUserLogged();
  }

  isSameDomain(domain: Domain): boolean {
    return this.authService.getAccount()?.domain.id == domain.id;
/*     return account.domain.id == domain.id; */
  }


  getUserClaims() : Claims | null {
    return this.authService.getUserClaims();
  }

  ngOnInit(): void {
  }

}
