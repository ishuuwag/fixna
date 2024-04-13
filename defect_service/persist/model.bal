import ballerina/persist as _;
import ballerina/time;

public type Issue record {|
  readonly string issue_id;
  string user_id;
  time:Date capture_date;
  string town;
  float latitude;
  float longitude;
  string description;
  string image_path;
|};
