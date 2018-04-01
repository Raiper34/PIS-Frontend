import {PersonModel} from "./person.model";

export interface AuthModel {
  user: PersonModel;
  authToken: string;
}
