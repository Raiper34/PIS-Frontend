import {PersonModel} from "./person.model";

/*
 * Auth Model
 * Interface for authentification objects
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 23.4.2018
 */
export interface AuthModel {
  user: PersonModel;
  authToken: string;
}
