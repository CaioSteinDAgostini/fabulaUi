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

  constructor(private authService: AuthService,  private accountsService: AccountService, private formBuilder: FormBuilder) {

  }


  usernamePlaceholder: String | null = "root@domain.com";
  pwdPlaceholder : String | null = "pwd";

  _userToken: Token | null = null;
  @Output() outputUserToken = new EventEmitter<Token>();
  userClaims: Claims | null = null;

  _selectedAccountToken: Token | null = null;
  @Output() outputAccountToken = new EventEmitter<Token>();
  accountClaims: Claims | null = null;
  _selectedAccount: Account | null = null;
  @Output() outputSelectedAccount = new EventEmitter<Account>();

  _availableDomains: Domain[] | null= []
  @Output() outputSelectedDomain = new EventEmitter<Domain>();

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
    if(username && password){
    this.authService.postAuthentication(username, password).subscribe(token => {
      this._userToken = token;
      this.outputUserToken.emit(token);
      this.userClaims = this.authService.decode(this._userToken);
      this._availableDomains = this.userClaims.domains;

      let rootDomain  = this._availableDomains.find((element) => element.root);
      if(rootDomain?.id){
        this.connectToDomain(rootDomain.id);
      }
    });
    this.submitted = true;
  }
  }

  isSame(account : Account, domain : Domain) : boolean {
    return account.domain.id == domain.id;
  }

  connectToDomain(domainId: string): void {
    if (this._userToken && this._userToken.token) {
      this.authService.postAuthorization(this._userToken, domainId).subscribe(accountToken => {
        this._selectedAccountToken = accountToken;
        this.accountClaims = this.authService.decode(accountToken);
        this.outputAccountToken.emit(accountToken);
        this.outputSelectedDomain.emit(this.accountClaims.domain);
        this.accountsService.getAccount(this._selectedAccountToken).subscribe(account => {
          this._selectedAccount = account;
          this.outputSelectedAccount.emit(account);
        });
      });
      
    }
    else {
      throw new Error();
    }
  }

  switchDomains(){
    this._switchDomains=!this._switchDomains;
  }

}
