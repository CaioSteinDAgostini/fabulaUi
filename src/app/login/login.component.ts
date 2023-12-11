import { Component, Output, EventEmitter } from '@angular/core'; ''
import { AuthService } from 'src/app/auth/auth.service';
import { Token } from 'src/token';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import { Claims } from 'src/app/auth/claims';
import { Domain } from 'src/app/domain/domain';
import { Account } from 'src/app/accounts/account';
import { AccountService } from 'src/app/accounts/account.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private accountsService: AccountService, private formBuilder: FormBuilder) {

    this.authService.outputUserToken.subscribe(
      (userToken: Token) => {
        this.authService.getAvailableDomains();
        console.log("AuthService returned ");
        
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


  usernamePlaceholder: String | null = "root@domain.com";
  pwdPlaceholder: String | null = "pwd";

 
  submitted = false;

  _switchDomains: Boolean = false;

  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  onSubmit() {
    console.log(this.loginForm.controls['username'].value + ":" + this.loginForm.controls['password'].value)
    let username = this.loginForm.controls['username'].value;
    let password = this.loginForm.controls['password'].value;
    if (username && password) {
      this.authService.postAuthentication(username, password);
    }
  }

  isSameDomain(domain: Domain): boolean {
    return this.authService.getAccount()?.domain.id == domain.id;
/*     return account.domain.id == domain.id; */
  }

  connectToDomain(domainId: string): void {
    if (this.authService.getUserToken()) {
      console.log("login component trying to connect to domain "+ domainId);
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
    return this.authService.getAvailableDomains();
  }

  isUserLogged() : boolean {
    return this.authService.isUserLogged();
  }

  getUserClaims() : Claims | null {
    return this.authService.getUserClaims();
  }

}
