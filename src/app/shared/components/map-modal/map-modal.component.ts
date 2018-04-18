import { Component , EventEmitter, Output, Input, OnInit, ViewChild} from '@angular/core';
declare var jQuery: any;
import { MapsAPILoader, AgmMap } from '@agm/core';
import { MapService} from '../../shared.module';


@Component({
  selector: 'map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['map-modal.component.css'],

})
export class MapModalComponent implements OnInit {
    @ViewChild('map') map: AgmMap;
    public constructor(public mapService: MapService) { 
        mapService.getMap().subscribe(result=>{
            console.log(result)
        }
        ,error=>{
            console.log(error)
        })
    }
    zoom: number = 10;
    ngOnInit(): void {
        this.resizeMap();
    }

    ngOnChanges(): void {
        setTimeout(() => {this.map.triggerResize();},500)
    }

    lat: number = 51.678418;
    lng: number = 7.809007;
    @Input() public title : string;
    public onCloseMap(){
        jQuery("#mapModal").modal("hide");
    }
    public onOpenModal() {
        jQuery("#mapModal").modal({backdrop: 'static', keyboard: false});
        this.resizeMap()      
    }

    resizeMap(): any {
        this.map.triggerResize();
    }
}