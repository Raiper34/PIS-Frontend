/*
 * Person Model
 * Interface for Person objects, eg. Customer, Employee, Admin
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 23.4.2018
 */
export interface PersonModel {
  active?: boolean;
  id?: string;
  firstname: string;
  surname: string;
  personalId: string;
  email: string;
  birthDate: number;
  role: string; //ENUM
  phone: string;
  password: string;
  passwordAgain: string;
}
