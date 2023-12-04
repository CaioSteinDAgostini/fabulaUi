import { Component, Input } from '@angular/core';
import { Token } from 'src/token';
import { Account } from 'src/app/accounts/account';
import { Domain } from 'src/app/domain/domain';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fabula';

  userToken: Token | null = null;
  selectedAccountToken: Token | null = null;
  selectedAccount : Account | null = null;
  availableDomains : Domain[] | null = null;
  rootDomain : Domain | null = null;
  selectedDomain : Domain | null = null;

 

  setUserToken(jwt: Token) {
    this.userToken = jwt;
  }
/////////////////////////////////////////

  
  setSelectedAccountToken(selectedAccountToken: Token) {
    this.selectedAccountToken = selectedAccountToken;
  }

  setSelectedAccount(selectedAccount : Account){
    console.log("selected account got updated");
    console.log(JSON.stringify(selectedAccount));
    this.selectedAccount = selectedAccount;
  }

  printJwtAndClaims() {
    console.log("jwt= " + this.userToken?.token);
  }
}
