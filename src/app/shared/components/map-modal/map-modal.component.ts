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
    public constructor(public mapService: MapService) { }
    zoom: number = 10;
    ngOnInit(): void {
        this.resizeMap();
        this.mapService.getMap().subscribe(result=>{
            let lines = result.toString().split('<br>')
            // for line in lines:
            //     logs = line.split('- Log: ')
            //     if(len(logs) == 2):
            //         name = logs[0]
            //         log = logs[1]
            //         if log != '':
            //             print(name)
            //             students = log.split('$')
            //             for student in students:
            //                 objects = student.split(' - ')
            //                 for object in objects:
            //                     atts = object.split(': ')
            //                     print(atts)
            console.log(result)

        },error=>{
            console.log(error)
        });
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