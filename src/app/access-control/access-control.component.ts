// access-control.component.ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-access-control',
  templateUrl: './access-control.component.html',
  styleUrls: ['./access-control.component.css']
})
export class AccessControlComponent implements OnInit {
  @Output() loggedInStatus = new EventEmitter<boolean>();

  isLoggedIn = false;
  uid: string | null = null;

  private authStateSubscription!: Subscription;

  constructor(public authService: AuthService, private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.authStateSubscription = this.afAuth.authState.subscribe((user) => {
      this.isLoggedIn = !!user;
      this.loggedInStatus.emit(this.isLoggedIn);
      this.uid = user ? user.uid : null;
    });
  }

  ngOnDestroy() {
    if (this.authStateSubscription) {
      this.authStateSubscription.unsubscribe();
    }
  }
}
