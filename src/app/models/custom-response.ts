import {Note} from "./note";
import {LoginResponse} from "./login-response";

export interface CustomResponse {
  timeStamp:Date;
  statusCode:number;
  status:string;
  reason:string;
  message:string;
  developerMessage:string;
  data:{notes?:Note[],note?:Note,loginResponse?:LoginResponse}

}
