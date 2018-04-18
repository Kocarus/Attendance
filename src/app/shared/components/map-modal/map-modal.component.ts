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
    public constructor() { 
    }
    zoom: number = 17;
    ngOnInit(): void {
        this.resizeMap();
    }

    ngOnChanges(): void {
        setTimeout(() => {this.map.triggerResize();},500)
    }

    lat: number = 10.7895719;
    lng: number = 106.7024624;
    @Input() public title : string;
    public onCloseMap(){
        jQuery("#mapModal").modal("hide");
    }
    public onOpenModal() {
        jQuery("#mapModal").modal({backdrop: 'static', keyboard: false});
        this.resizeMap()      
    }
    markers: marker[] = [
        {
            lat: 10.7896335,
            lng: 106.7022943,
            label: 'A'
        },
        {
            lat: 10.7895644,
            lng: 106.7024484,
            label: 'A'
        },
        {
            lat: 10.7896215,
            lng: 106.7024325,
            label: 'A'
        },
        {
            lat: 10.7893873,
            lng: 106.7025177,
            label: 'A'
        },
        {
            lat: 10.7892488,
            lng: 106.7026373,
            label: 'A'
        },
        {
            lat: 10.789417,
            lng: 106.7024676,
            label: 'A'
        },
        {
            lat: 10.7893667,
            lng: 106.7025714,
            label: 'A'
        },
        {
            lat: 10.7624614,
            lng: 106.6820569,
            label: 'A'
        },
        {
            lat: 10.7624665,
            lng: 106.6820483,
            label: 'A'
        },
        {
            lat: 10.7896446,
            lng: 106.7024325,
            label: 'A'
        },
        {
            lat: 10.7895719,
            lng: 106.7024624,
            label: 'A'
        },
        {
            lat: 10.7891943,
            lng: 106.7026637,
            label: 'A'
        },
        {
            lat: 10.7894951,
            lng: 106.7024969,
            label: 'A'
        },
        {
            lat: 10.7894285,
            lng: 106.702487,
            label: 'A'
        },
        {
            lat: 10.7624744,
            lng: 106.6820169,
            label: 'A'
        },
        {
            lat: 10.7894693,
            lng: 106.7025056,
            label: 'A'
        },
        {
            lat: 10.7894696,
            lng: 106.7025362,
            label: 'A'
        },
        {
            lat: 10.789081,
            lng: 106.7030663,
            label: 'A'
        },
        {
            lat: 10.7624814,
            lng: 106.6820162,
            label: 'A'
        },
        {
            lat: 10.7895419,
            lng: 106.7025147,
            label: 'A'
        },
        {
            lat: 10.7895437,
            lng: 106.7024186,
            label: 'A'
        },
        {
            lat: 10.7896455,
            lng: 106.7024372,
            label: 'A'
        },
        {
            lat: 10.7624774,
            lng: 106.682046,
            label: 'A'
        },
        {
            lat: 10.7895408,
            lng: 106.7024788,
            label: 'A'
        },
        {
            lat: 10.7894285,
            lng: 106.7024873,
            label: 'A'
        }
    ]
    resizeMap(): any {
        this.map.triggerResize();
    }
}
// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
}
