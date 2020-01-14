import { AEntityRoutingModule } from './a-entity-routing.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AEntityComponent } from './a-entity.component';
import { EntityComponent } from './entity/entity.component';

@NgModule({
  imports: [
    CommonModule,
    AEntityRoutingModule
  ],
  declarations: [AEntityComponent, EntityComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AEntityModule { }
