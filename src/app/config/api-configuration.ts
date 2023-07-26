export class ApiConfiguration {

  public static apiVersion='v1'
  public static rootUrl=`http://localhost:8080/api/${ApiConfiguration.apiVersion}`
  public static noteResourceUrl=`${ApiConfiguration.rootUrl}/notes`
  public static authUrl=`${ApiConfiguration.rootUrl}/auth`

}
