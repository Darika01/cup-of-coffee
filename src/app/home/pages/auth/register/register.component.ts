import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { matchOtherValidator } from './password-validation';

import { User } from '../../../../core/models/user.model';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() emitTitle = new EventEmitter<boolean>();

  logForm: FormGroup;

  error: string;
  success: string;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.logForm = new FormGroup({
      username: new FormControl(null, [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(14),
            Validators.pattern("[A-Za-z0-9.'_-]{2,14}")
            ]),
      email: new FormControl(null, [
            Validators.required,
            Validators.email
            ]),
      password: new FormControl(null, [
            Validators.minLength(6),
            Validators.maxLength(24),
            Validators.required
          ]),
      ConfirmPassword: new FormControl(null, [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(24),
            matchOtherValidator('password')
            ])
    });
  }

  createUser() {
    const user = new User(
      this.logForm.value.email,
      this.logForm.value.password,
      this.logForm.value.username
    );
    this.authService.signup(user)
          .subscribe(
            data => {
              this.success = 'Rejestracja przebiegła pomyślnie. Możesz się zalogować';
              const userLogin = new User(
                this.logForm.value.email,
                this.logForm.value.password
              );
              this.authService.login(userLogin)
                .pipe(first())
                .subscribe(
                  logdata => {
                    this.router.navigate(['/']);
                  },
                  err => {
                    if (err.status === 401) {
                      this.error = 'Nieprawidłowy login lub hasło';
                      setTimeout(() => this.error = null, 4000);
                    } else {
                        this.error = 'Wystąpił nieoczekiwany błąd. Spróbuj zalogować się ponownie';
                        setTimeout(() => this.error = null, 4000);
                    }
                  }
                );
              this.logForm.reset();
            },
            err => {
              if (err.error.text === 'username') {
                this.error = 'Użytkownik o podanym username już istnieje';
                setTimeout(() => this.error = null, 4000);
              } else if (err.error.text === 'email') {
                  this.error = 'Użytkownik o podanym email już istnieje';
                  setTimeout(() => this.error = null, 4000);
              } else if (err.status === 422) {
                // this.error = err;
                  this.error = 'Użytkownik o podanym username lub email już istnieje';
                  setTimeout(() => this.error = null, 4000);
              } else {
                  this.error = 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie';
                  setTimeout(() => this.error = null, 4000);
              }

            }
          );
  }

  changeTitle(title: boolean) {
    this.emitTitle.emit(title);
  }

}
