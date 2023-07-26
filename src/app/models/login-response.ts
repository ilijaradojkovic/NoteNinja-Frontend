export interface LoginResponse {
  jwt:string,
  refresh_token:string,
  user_id:number,
  email:string,
  username:string,
  roles:[string]
}
