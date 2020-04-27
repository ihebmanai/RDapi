import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-list-probleme',
  templateUrl: './list-probleme.component.html',
  styleUrls: ['./list-probleme.component.css']
})
export class ListProblemeComponent implements OnInit {
  video: any
  constructor() { }

  async ngOnInit() {
    navigator.getUserMedia = navigator.getUserMedia;

  }
  public async shareScreen() {


    const constraints = {
      video: true,
      audio: true
    };
    console.log(document.querySelector('video'))
    document.querySelector('video').srcObject = await navigator.mediaDevices.getDisplayMedia(constraints);


  }
}
