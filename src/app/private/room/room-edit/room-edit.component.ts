import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from "../../../shared/models/app.state";
import {select, Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {serviceListActions} from "../../../shared/reducers/serviceList.reducer";
import {ServiceModel} from "../../../shared/models/service.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MzToastService} from "ng2-materialize";
import {AuthService} from "../../../shared/services/auth.service";
import {serviceActions} from "../../../shared/reducers/service.reducer";
import {Subscription} from "rxjs/Subscription";
import {ApiService} from "../../../shared/services/api.service";
import {roomActions} from "../../../shared/reducers/room.reducer";
import {RoomModel} from "../../../shared/models/room.model";

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.scss']
})
export class RoomEditComponent implements OnDestroy {

  roomSubscription: Subscription;
  room: RoomModel;
  editForm: FormGroup;
  editMode = false;
  isDispatched = false;

  roomTypes = [
    {value: 'SINGLE', title: 'Single'},
    {value: 'DOUBLE', title: 'Double'},
    {value: 'APARTMENT', title: 'Apartment'},
  ];

  constructor(private store: Store<AppState>,
              private formBuilder: FormBuilder,
              private toastService: MzToastService,
              private router: Router,
              private api: ApiService,
              private auth: AuthService,
              private route: ActivatedRoute) {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: [this.roomTypes[0].value, Validators.required],
      price: [0],
      capacity: [0],
      size: [0],
      description: [''],
    });

    this.route.params.subscribe(params => {
      this.editMode = !!params.id;
      if (this.editMode) {
        this.isDispatched = true;
        this.store.dispatch({type: roomActions.GET_REQUEST, payload: params.id});
      }
    });

    this.roomSubscription = store.pipe(select('room')).subscribe((room: RoomModel) => {
      this.room = room;
      if (this.isDispatched) {
        this.editForm.patchValue({
          ...this.room,
        });
      }
    });
  }

  submitForm(): void {
    const service = {
      ...this.room,
      ...this.editForm.getRawValue(),
    };
    if (this.editMode) {
      this.api.update('room', this.room.id, service).subscribe(
        () => {
          this.toastService.show('Room editation successful!', 3000, 'green');
          this.router.navigate(['private/room']);
        },
        (error) => this.toastService.show(error.message, 3000, 'red')
      );
    } else {
      this.api.create('room', service).subscribe(
        () => {
          this.toastService.show('Room editation successful!', 3000, 'green');
          this.router.navigate(['private/room']);
        },
        (error) => this.toastService.show(error.message, 3000, 'red')
      );
    }
  }

  ngOnDestroy(): void {
    this.roomSubscription.unsubscribe();
  }

}
