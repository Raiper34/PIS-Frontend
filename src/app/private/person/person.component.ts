import {Component, OnDestroy} from '@angular/core';
import {AppState} from "../../shared/models/app.state";
import {select, Store} from "@ngrx/store";
import {customerListActions} from "../../shared/reducers/customerList.reducer";
import {Subscription} from "rxjs/Subscription";
import {PersonModel} from "../../shared/models/person.model";
import {serviceListActions} from "../../shared/reducers/serviceList.reducer";
import {ServiceModel} from "../../shared/models/service.model";
import {pageSize} from "../../shared/components/pagination/pagination.component";
import {ActivatedRoute} from "@angular/router";
import {employeeListActions} from "../../shared/reducers/employeeList.reducer";
import {MzToastService} from "ng2-materialize";
import {ApiService} from "../../shared/services/api.service";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnDestroy {

  personListSubscription: Subscription;
  personListValue: PersonModel[] = [];
  personList: PersonModel[] = [];
  personListSize = 0;
  currentPage = 0;
  searchString = '';
  isEmployee = false;
  pageName = 'customer';

  pickedToDeletePerson: PersonModel;

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              private toastService: MzToastService,
              private api: ApiService) {
    this.isEmployee = this.route.snapshot.data['type'] == 'employee';
    this.pageName = this.isEmployee ? 'employee' : 'customer';
    this.personListSubscription = store.pipe(select(this.isEmployee ? 'employeeList' : 'customerList')).subscribe((customerList: PersonModel[]) => {
      this.personListValue = customerList;
      this.preparePersonList();
    });
    this.store.dispatch({type: this.isEmployee ? employeeListActions.GET_REQUEST : customerListActions.GET_REQUEST});
  }

  preparePersonList(): void {
    const customerListValue = this.personListValue.filter(
      (item) => item.surname.includes(this.searchString) ||
        item.firstname.includes(this.searchString)
    );
    this.personListSize = customerListValue.length;
    this.personList = customerListValue
      .filter((item, index) => index >= this.currentPage * pageSize && index < (this.currentPage * pageSize) + pageSize);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.preparePersonList();
  }

  searchByString(search: string): void {
    this.searchString = search;
    this.preparePersonList();
  }

  ngOnDestroy(): void {
    this.personListSubscription.unsubscribe();
  }

  deletePerson(): void {
    this.api.delete(this.isEmployee ? 'admin/user' : 'customer', this.pickedToDeletePerson.id).subscribe(
      () => {
        this.store.dispatch({type: serviceListActions.GET_REQUEST});
        this.toastService.show('Deletion successful!', 3000, 'green');
      },
      (error) => this.toastService.show(error.message, 3000, 'red')
    );
  }

  pickToDelete(person: PersonModel): void {
    this.pickedToDeletePerson = person;
  }

}
