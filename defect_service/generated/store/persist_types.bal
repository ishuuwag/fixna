// AUTO-GENERATED FILE. DO NOT MODIFY.
// This file is an auto-generated file by Ballerina persistence layer for model.
// It should not be modified by hand.
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

public type IssueOptionalized record {|
    string issue_id?;
    string user_id?;
    time:Date capture_date?;
    string town?;
    float latitude?;
    float longitude?;
    string description?;
    string image_path?;
|};

public type IssueTargetType typedesc<IssueOptionalized>;

public type IssueInsert Issue;

public type IssueUpdate record {|
    string user_id?;
    time:Date capture_date?;
    string town?;
    float latitude?;
    float longitude?;
    string description?;
    string image_path?;
|};

