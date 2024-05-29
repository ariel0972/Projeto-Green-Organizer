import { Component } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  date: Date = new Date()
  profile!: Profile;

  ngOnInit() {
      this.profile = new ProfileService().getProfile();
  }
}
