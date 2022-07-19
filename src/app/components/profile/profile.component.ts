import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { ImageUploadService } from 'src/app/services/image-upload/image-upload.service';
import { UserService } from 'src/app/services/user/user.service';
import { switchMap, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProfileUser } from 'src/app/models/Profile.model';
@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public user$ = this.userService.currentUserProfile$;

  profileForm = new FormGroup({
    uid: new FormControl(''),
    displayName: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    isAdmin: new FormControl(''),
  });

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private imageUploadService: ImageUploadService,
    private toast: HotToastService
  ) {}
  ngOnInit(): void {
    this.userService.currentUserProfile$
      .pipe(untilDestroyed(this), tap(console.log))
      .subscribe((user) => {
        this.profileForm.patchValue({ ...user });
      });
  }

  uploadFile(event: any, { uid }: ProfileUser) {
    this.imageUploadService
      .uploadImage(event.target.files[0], `images/profile/${uid}`)
      .pipe(
        this.toast.observe({
          loading: 'Uploading profile image...',
          success: 'Image uploaded successfully',
          error: 'There was an error in uploading the image',
        }),
        switchMap((photoURL) =>
          this.userService.updateUser({
            uid,
            photoURL,
          })
        )
      )
      .subscribe();
  }

  saveProfile() {
    // const profileData = this.profileForm.value;
    // this.userService
    //   .updateUser(profileData)
    //   .pipe(
    //     this.toast.observe({
    //       loading: 'Saving profile data...',
    //       success: 'Profile updated successfully',
    //       error: 'There was an error in updating the profile',
    //     })
    //   )
    //   .subscribe();
  }
}
