import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from "@angular/router";
import { TokenStorageService } from 'src/app/services/token-storage.service';
import 'src/app/models/user.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: User = {
    username: '',
    password: ''
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,
              private _router: Router,
              private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()){
      this.isLoggedIn = true;
      this._router.navigate(['/home']);
    }
  }

  login():void{
  const {username, password} = this.form;

  this.authService.login(username, password).subscribe(
    data => {
      if(data != 'Bad credentials'){
      console.log('data',data)
      this.tokenStorage.saveToken(data);
      this.isLoggedIn = true;
      this._router.navigate(['/home']);
      }
    },
    err => {
      this._router.navigate(['/home']);
      this.errorMessage = err.error.message;
      console.log(err.error.message);
    }
   );
  }
}
