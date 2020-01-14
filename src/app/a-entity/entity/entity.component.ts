import { Component, OnInit, Input, OnChanges, SimpleChanges, ElementRef, OnDestroy } from '@angular/core';

declare global {
  interface Element {
    setAttribute(name: string, value: any): void;
  }
}

@Component({
  selector: 'a-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  id: string;

  @Input()
  primitive: string;

  @Input()
  color: string;

  @Input()
  data: any;

  constructor(private hostEl: ElementRef) { }

  ngOnInit() { }

  // getAttributeType(attribute: string) {
  //   switch(attribute) {
  //     case 'primitive':
  //       return 'geometry';
  //     case 'color':
  //       return 'material';
  //     default: return;
  //   }
  // }

  // setAttribute(entity: HTMLElement, attribute: string, value: string) {
  //   const type = this.getAttributeType(attribute);
  //   if (!type) { return entity; }
  //   entity.setAttribute(
  //     type,
  //     // @ts-ignore
  //     { [attribute]: value }
  //   );
  //   return entity;
  // }

  ngOnChanges(changes: SimpleChanges): void {

    /**
     * Basic A-Frame entity creation
     * 
     * 1. Create an element
     * 2. Set their attribute
     * 3. Append the element to an A-Frame node.
     */
    {
      const scene = document.querySelector('a-scene');
      const el = document.createElement('a-entity');
      el.setAttribute('position', '0 0 -4');
      el.setAttribute('geometry', {
        ...(changes.primitive.currentValue ? { primitive: changes.primitive.currentValue } : {})
      });
      el.setAttribute('material', {
        ...(changes.color.currentValue ? { color: changes.color.currentValue } : {})
      });
      scene.appendChild(el);
    }


    // With helper
    // let entity2 = document.createElement('a-entity');
    // entity2.setAttribute('position', '1 1 -3');
    // entity2 = this.setAttribute(entity2, 'primitive', changes.primitive.currentValue)
    // entity2 = this.setAttribute(entity2, 'color', 'pink')
    // scene.appendChild(entity2);

    /**
     * Object based A-Frame entity creation
     * 
     * An entity can have multiple attributes (geography, material, etc),
     * and each attribute can have a nested structure. Inputs can be objects
     * so that there is no need to parse individual values and keys.
     */
    {
      const scene = document.querySelector('a-scene');
      const data = changes.data.currentValue;
      const el = document.createElement('a-entity');
      el.id = 'entity3_id'
      el.setAttribute('position', '2 2 -5');
      for (let key in data) {
        el.setAttribute(
          key,
          data[key]
        );
      }
      scene.appendChild(el)
    }

    /**
     * Append A-Frame entity by host element.
     * 
     * Removal of host element will also remove all child elements.
     */
    {
      const data = changes.data.currentValue;
      this.hostEl.nativeElement.setAttribute('position', '1 4 -5');
      for (let key in data) {
        this.hostEl.nativeElement.setAttribute(
          key,
          data[key]
        );
      }
    }
    
  }

  ngOnDestroy(): void {

    /**
     * Example of removing A-Frame element by ID
     * 
     * Hook removal to event to have predictable behavior.
     */
    {
      setTimeout(() => {
        const el = document.getElementById('entity3_id');
        el.parentNode.removeChild(el);
      }, 1000);
    }

  }

}
