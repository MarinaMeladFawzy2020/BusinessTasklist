import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {ButtonModule} from 'primeng/button';
import {ListboxModule} from 'primeng/listbox';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';

import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {MenubarModule} from 'primeng/menubar';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ToolbarModule} from 'primeng/toolbar';
import {SplitButtonModule} from 'primeng/splitbutton';
import {PanelMenuModule} from 'primeng/panelmenu';
import {TreeModule} from 'primeng/tree';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputMaskModule} from 'primeng/inputmask';
import {SplitterModule} from 'primeng/splitter';
import {RippleModule } from 'primeng/ripple';
import {PasswordModule} from 'primeng/password';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CheckboxModule} from 'primeng/checkbox';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {PaginatorModule} from 'primeng/paginator';
import {DividerModule} from 'primeng/divider';
import {TabViewModule} from 'primeng/tabview';
import {CarouselModule} from 'primeng/carousel';
import { PanelModule } from "primeng/panel";
import {CardModule} from 'primeng/card';
import {DataViewModule} from 'primeng/dataview';
import { ChipModule } from 'primeng/chip';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {AccordionModule} from 'primeng/accordion';
import {BadgeModule} from 'primeng/badge';
import {GMapModule} from 'primeng/gmap';
import {TooltipModule} from 'primeng/tooltip';

import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ChartModule} from 'primeng/chart';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ScrollTopModule} from 'primeng/scrolltop';

const primengModules = [

    ButtonModule,
    SplitButtonModule,
    ListboxModule,
    InputTextModule,
    PasswordModule,
    InputMaskModule,
    InputTextareaModule,
    BreadcrumbModule,
    ToolbarModule,
    PanelMenuModule,
    TableModule,
    MenubarModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    TreeModule,
    SplitterModule,
    RippleModule,
    RadioButtonModule,
    CheckboxModule,
    OrganizationChartModule,
    PaginatorModule,
    DividerModule,
    TabViewModule,
    CarouselModule,
    PanelModule,
    CardModule,
    DataViewModule,
    ChipModule,
    ScrollPanelModule,
    AccordionModule,
    BadgeModule,
    GMapModule,
    ConfirmPopupModule,
    TooltipModule,
    ChartModule,
    MessageModule,
    MessagesModule,
    ScrollTopModule
    
   
];

@NgModule({
  imports: [
    CommonModule,
    ...primengModules
  ],
  exports: [
    ...primengModules
  ],
})

export class PrimengModule { }