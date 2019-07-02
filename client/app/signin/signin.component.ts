import { AuthService } from './../core/services/auth/auth.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  public form = this.fb.group({
    uid: ['', [
      Validators.required
    ]],
    auth_key: ['', [
      Validators.required
    ]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  public onSubmit() {
    // TODO: Use EventEmitter with form value
    this.authService.signIn(this.form.value)
      .subscribe((authToken) => {
        console.log(authToken);
      });
  }
}
