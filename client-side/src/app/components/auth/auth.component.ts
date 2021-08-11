import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {

  constructor(@Inject(DOCUMENT) public document: Document,public auth:AuthService) { }

  ngOnInit(): void {
  }

  loginPopup() : void
  {
    this.auth.loginWithPopup();
  }

  logout() : void
  {
      this.auth.logout({returnTo: this.document.location.origin})
  }

  isAuthenticated() : Observable<boolean>
  {
    return this.auth.isAuthenticated$;
  }
}
