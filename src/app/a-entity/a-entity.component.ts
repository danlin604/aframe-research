import { Component, OnInit } from '@angular/core';
// import aframe from 'aframe';

import 'src/scripts/test.script.js';

// Resolving 
declare const AFRAME: any;

@Component({
  selector: 'app-a-entity',
  templateUrl: './a-entity.component.html',
  styleUrls: ['./a-entity.component.css']
})
export class AEntityComponent implements OnInit {

  public timeout: boolean = true;

  constructor() { }

  ngOnInit() {

    // Calling A-Frame
    console.log('a-entity component', AFRAME.registerComponent);

    // Dangers of a fake type
    // console.log('a-entity component', AFRAME.registerComponent.a.b);


    setTimeout(() => {
      this.timeout = false;
    }, 3000);
  }

}
