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
