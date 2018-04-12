import { Component , EventEmitter, Output, Input, OnInit} from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['map-modal.component.css'],

})
export class MapModalComponent implements OnInit {
    public constructor() { }
    zoom: number = 10;
    ngOnInit(): void {
    }
    lat: number = 51.678418;
    lng: number = 7.809007;
    @Input() public title : string;
    public onCloseMap(){
        jQuery("#mapModal").modal("hide");
    }
    public onOpenModal() {
        jQuery("#mapModal").modal({backdrop: 'static', keyboard: false});
    }


}