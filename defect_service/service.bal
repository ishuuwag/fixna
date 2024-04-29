import defect_service.store;
import ballerina/http;
import ballerina/time;
import ballerina/mime;


configurable string password = ?;
configurable string host = ?;
configurable int port = ?;
configurable string database = ?;
configurable string user = ?;

store:Client db_client = check new();
int counter = 1;

# A service representing a network-accessible API
# bound to port `9090`.

service / on new http:Listener(9090) {
  //int counter = 1;

    resource function post defects(http:Request the_req) returns http:Response|error {
      //here we will assume that the request has multiple parts

      json incoming_payload = {};

      mime:Entity clt_parent_entity = new;
      mime:Entity child_part1 = new;
      mime:Entity child_part2 = new;

      mime:Entity[] the_parts =  check the_req.getBodyParts();

      foreach var part in the_parts {
          string base_type = getBaseType(part.getContentType());
          if base_type is mime:APPLICATION_JSON {
              incoming_payload = check part.getJson();
          } else if base_type == mime:IMAGE_JPEG {
              child_part2 = part;
          }
      }
      
      //extract the correct field and create an issue
      string the_issue_id = string `defect_${counter}`;
      counter += counter;
      time:Utc utc = time:utcNow(); 
      string converted_date = time:utcToString(utc);
      time:Date the_date = check dateFromBasicString2(converted_date);
      child_part1.setJson({"issue_id": the_issue_id, "date": converted_date});
      mime:Entity[] child_parts = [child_part1, child_part2];
      clt_parent_entity.setBodyParts(child_parts, contentType = mime:MULTIPART_MIXED);
      
      http:Request req = new;
      req.setBodyParts(child_parts, contentType = mime:MULTIPART_FORM_DATA);

      http:Client httpClient = check new ("196.216.167.100:8080");
      string the_image_path = check httpClient->/store.post(req);
      
      string the_user_id = check incoming_payload.user_id.ensureType(); 
      string the_town = check incoming_payload.town.ensureType();
      float the_latitude = check incoming_payload.latitude.ensureType();
      float the_longitude = check incoming_payload.longitude.ensureType();
      string the_description = check incoming_payload.description.ensureType();

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
     response.setPayload({message: "New issue successfully submitted",
                          issue_id: the_issue_id});
     return response;
    }
}

function getBaseType(string contentType) returns string {
    var result = mime:getMediaType(contentType);
    if result is mime:MediaType {
        return result.getBaseType();
    }
    panic result;
}


# converts time:Date value to 01/12/2015 format.
#
# + dateValue - Date value.
# + return - string value.
function dateToBasicString(time:Date dateValue) returns string|error {
    string year = dateValue.year.toString();
    string month = dateValue.month < 10 ? 
        string `0${dateValue.month}` : dateValue.month.toString();
    string date = dateValue.day < 10 ? 
        string `0${dateValue.day}` : dateValue.day.toString();
    return string `${date}/${month}/${year}`;
}


function dateFromBasicString(string sValue) returns time:Date|error {
    string[] splittedValues = re `/`.split(sValue.trim());
    int day = check int:'fromString(splittedValues[0]);
    int month = check int:'fromString(splittedValues[1]);
    int year = check int:'fromString(splittedValues[2]);
    return {year, month, day};
}


function dateFromBasicString2(string sValue) returns time:Date|error {
    string[] splittedValues = re `:`.split(sValue.trim());
    string[] second_split = re `-`.split(splittedValues[0].trim());
    int year = check int:'fromString(second_split[0]);
    int month = check int:'fromString(second_split[1]);
    string[] final_split = re `T`.split(second_split[2].trim());
    int day = check int:'fromString(final_split[0]);
    return {year, month, day};
}

