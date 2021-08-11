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
    public loadingState: boolean | undefined;

    constructor(
        public auth: AuthService
    ) { }

    ngOnInit(): void {
        this.getLoadingState();
        this.getAthentication();
        this.getUserInfo();
    }

    public getUserInfo() {
        this.auth.user$.subscribe(
            profile => {
                this.userInfo = profile;
            }
        );
    }

    public logout() {
        this.auth.logout();
    }

    public login() {
        this.auth.loginWithPopup();
    }

    private getAthentication() {
        this.auth.isAuthenticated$.subscribe(
            result => {
                this.isAuthenticated = result;
            }
        );
    }

    private getLoadingState() {
        this.auth.isLoading$.subscribe(
            result => {
                this.loadingState = result;
            }
        );
    }
}
