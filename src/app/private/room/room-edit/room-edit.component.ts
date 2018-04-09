import {Component, OnDestroy} from '@angular/core';
import {AppState} from "../../../shared/models/app.state";
import {select, Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MzToastService} from "ng2-materialize";
import {AuthService} from "../../../shared/services/auth.service";
import {Subscription} from "rxjs/Subscription";
import {ApiService} from "../../../shared/services/api.service";
import {roomActions} from "../../../shared/reducers/room.reducer";
import {RoomModel} from "../../../shared/models/room.model";

/*
 * Room Edit Component
 * Contains form for editing and creating room
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 23.4.2018
 */
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

  /**
   * Constructor with Dependency Injection
   * @param {Store<AppState>} store
   * @param {FormBuilder} formBuilder
   * @param {MzToastService} toastService
   * @param {Router} router
   * @param {ApiService} api
   * @param {AuthService} auth
   * @param {ActivatedRoute} route
   */
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
      if (this.editMode) { //it is editing
        this.isDispatched = true;
        this.store.dispatch({type: roomActions.GET_REQUEST, payload: params.id});
      }
    });

    this.roomSubscription = store.pipe(select('room')).subscribe((room: RoomModel) => {
      this.room = room;
      if (this.isDispatched) { //it was dispatched, so we have wanted data
        this.editForm.patchValue({
          ...this.room,
        });
      }
    });
  }

  /**
   * Submit Form
   * Submit form data to API to create new or edit existing room
   */
  submitForm(): void {
    const service = {
      ...this.room,
      ...this.editForm.getRawValue(),
    };
    if (this.editMode) { //it is editing
      this.api.update('room', this.room.id, service).subscribe(
        () => {
          this.toastService.show('Room editation successful!', 3000, 'green');
          this.router.navigate(['private/room']);
        },
        (error) => this.toastService.show(error.message, 3000, 'red')
      );
    } else { //it is creating
      this.api.create('room', service).subscribe(
        () => {
          this.toastService.show('Room editation successful!', 3000, 'green');
          this.router.navigate(['private/room']);
        },
        (error) => this.toastService.show(error.message, 3000, 'red')
      );
    }
  }

  /**
   * Ng On Destroy
   * Method that is called on component destroy
   */
  ngOnDestroy(): void {
    this.roomSubscription.unsubscribe();
  }

}
