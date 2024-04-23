import defect_service.store;
import ballerina/http;
import ballerina/time;

configurable string host = ?;
configurable int port = ?;
configurable string user = ?;
configurable string password = ?;
configurable string database = ?;


store:Client db_client = check new();
int counter = 1;

# A service representing a network-accessible API
# bound to port `9090`.

service / on new http:Listener(9090) {
  //int counter = 1;

    resource function post defects(http:Request the_req) returns http:Response|error {
      json payload = check the_req.getJsonPayload();
      // first step -- check the image and store it on a CDN which returns the image path
      string the_image_path = "";

      //extract the correct field and create an issue
      string the_issue_id = string `defect_${counter}`;
      counter += counter;
      
      string the_user_id = check payload.token;
      time:Date the_date = check payload.date.ensureType();
      string the_town = check payload.town.ensureType();
      float the_latitude = check payload.latitude.ensureType();
      float the_longitude = check payload.longitud.ensureType();
      string the_description = check payload.description.ensureType();

      //create the issue object
      store:Issue new_issue = {
        user_id: the_user_id,
        issue_id: the_issue_id,
        capture_date: the_date,
        town: the_town,
        latitude: the_latitude,
        longitude: the_longitude,
        description: the_description,
        image_path: the_image_path
      };

      //add the new issue to the db
      //stream<store:Issue, error?> issue_str = db_client->/issues();
      _ = check db_client->/issues.post([new_issue]);
     
     //return the response object
     http:Response response = new;
     response.statusCode = http:STATUS_OK;
     response.setPayload({message: "New issue successfully submitted"});
     return response;
    }

}
