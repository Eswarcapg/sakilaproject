import { Component } from '@angular/core';
import { Actor } from '../models/film.model';
import { ActorService } from '../services/actor.service';

@Component({
  selector: 'app-add-actor',
  templateUrl: './add-actor.component.html',
  styleUrls: ['./add-actor.component.css']
})
export class AddActorComponent {
  actor: Actor = {
    firstName: '',
    lastName: '',
    lastUpdate: new Date().toISOString(),
    actorId: 0,
    films: []
  };

  message: string = '';

  constructor(private actorService: ActorService) { }

  isError: boolean = false;
  addActor(): void {
    if (!this.isValidName(this.actor.firstName) || !this.isValidName(this.actor.lastName)) {
      this.isError = true;
      this.message = 'Invalid input. Please enter a valid name.';
      return;
    }
     if (this.actor.actorId < 210) {
       this.message = 'Invalid actor Id...';
       return;
     }

    this.isError = false;
    this.actor.lastUpdate = new Date().toISOString();
    this.actorService.addActor(this.actor).subscribe(
      (response: ArrayBuffer) => {
        const textDecoder = new TextDecoder();
        this.message = textDecoder.decode(response);
      },
      (error) => {
        this.isError = true;
        this.message = 'Error adding actor';
        console.error(error);
      }
    );
  }

  isValidInput(): boolean {
    const nameRegex = /^[A-Za-z\s]+$/; // Regular expression to allow only letters and spaces
    return nameRegex.test(this.actor.firstName) && nameRegex.test(this.actor.lastName);
  }

  isValidName(name: string): boolean {
    const nameRegex = /^[A-Za-z\s]+$/; // Regular expression to allow only letters and spaces
    return nameRegex.test(name);
  }

  // private generateActorId(): number {
    
  //   return Math.floor(Math.random() * (1000 - 210 + 1)) + 210; // Example: Random number between 0 and 999
  // }

}
