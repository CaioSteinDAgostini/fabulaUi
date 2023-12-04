import { Component, Input, OnInit } from '@angular/core';
import { Account } from 'src/app/accounts/account';
import { AuthService } from 'src/app/auth/auth.service';
import { Token } from 'src/token';
import { Claims } from 'src/app/auth/claims';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

   _claims?: Claims;

  @Input() set claims(claims: Claims) {
    if (claims) {
      this._claims = claims;
    }
  }

  get claims(): Claims {
    if (this._claims) {
      return this._claims;
    }
    throw (new Error())

  }

  accounts: Account[] = [];

  constructor(private authService: AuthService) { }



  ngOnInit(): void {
  }



}
