import ballerina/http;
import defect.datasource;

datasource:Client db_client = check new;

# A service representing a network-accessible API
# bound to port `9090`.
service / on new http:Listener(9090) {
  int counter = 1;

    resource function post defects(http:Reques the_rq) returns http:Response|error {
      json payload = check the_req.gtJsonPayload();
      // first step -- check the image and store it on a CDN which returns the image path
      string the_image_path = ""

      //extract the correct field and create an issue
      string the_issue_id = "defect_" + (counter++).toString();
      string the_user_id = check value:ensureType(payload.token, string);
      time the_date = check value:ensureType(payload.date, time);
      float the_latitude = check value:ensureType(payload.latitude, float);
      float the_longitude = check value:ensureType(payload.longitude, float);
      string the_description = check value:ensureType(payload.description, string);

      //create the issue object
      datasource:Issue new_issue = {
        user_id: the_user_id,
        issue_id: the_issue_id,
        capture_date: the_date,
        latitude: the_latitude,
        longitude: the_longitude,
        description: the_description,
        image_path: the_image_path
      };

      //add the new issue to the db
      stream<datasource:Issue, error?> all_issues = db_client->/issues();
      check db_client->all_issues.post([an_issue]);
     
     //return the response object
     http:Response response = new;
     response.setPayload({message: "New issue successfully submitted"});
     response.setHeader("application/json");
     return response;
    }

}
