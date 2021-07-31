import { NgModule } from '@angular/core';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@NgModule({
  exports: [
    NzGridModule,
    NzMenuModule,
    NzLayoutModule
  ]
})
export class NgZorroAntdProviderModule { }
