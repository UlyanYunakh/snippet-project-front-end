import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { User } from "@auth0/auth0-spa-js";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    public userInfo: User | null | undefined
    public isAuthenticated: boolean | undefined;

    constructor(
        public auth: AuthService
    ) { }

    ngOnInit(): void {
        this.getAthentication();
        this.getUserInfo();
    }

    public getAthentication() {
        this.auth.isAuthenticated$.subscribe(
            auth => {
                this.isAuthenticated = auth;
            }
        );
    }

    public getUserInfo() {
        this.auth.user$.subscribe(
            profile => {
                this.userInfo = profile;
            }
        )
    }
}
