// AUTO-GENERATED FILE. DO NOT MODIFY.
// This file is an auto-generated file by Ballerina persistence layer for model.
// It should not be modified by hand.
import ballerina/jballerina.java;
import ballerina/persist;
import ballerina/sql;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
import ballerinax/persist.sql as psql;

const ISSUE = "issues";

public isolated client class Client {
    *persist:AbstractPersistClient;

    private final mysql:Client dbClient;

    private final map<psql:SQLClient> persistClients;

    private final record {|psql:SQLMetadata...;|} & readonly metadata = {
        [ISSUE] : {
            entityName: "Issue",
            tableName: "Issue",
            fieldMetadata: {
                issue_id: {columnName: "issue_id"},
                user_id: {columnName: "user_id"},
                capture_date: {columnName: "capture_date"},
                town: {columnName: "town"},
                latitude: {columnName: "latitude"},
                longitude: {columnName: "longitude"},
                description: {columnName: "description"},
                image_path: {columnName: "image_path"}
            },
            keyFields: ["issue_id"]
        }
    };

    public isolated function init() returns persist:Error? {
        mysql:Client|error dbClient = new (host = host, user = user, password = password, database = database, port = port, options = connectionOptions);
        if dbClient is error {
            return <persist:Error>error(dbClient.message());
        }
        self.dbClient = dbClient;
        self.persistClients = {[ISSUE] : check new (dbClient, self.metadata.get(ISSUE), psql:MYSQL_SPECIFICS)};
    }

    isolated resource function get issues(IssueTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get issues/[string issue_id](IssueTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post issues(IssueInsert[] data) returns string[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(ISSUE);
        }
        _ = check sqlClient.runBatchInsertQuery(data);
        return from IssueInsert inserted in data
            select inserted.issue_id;
    }

    isolated resource function put issues/[string issue_id](IssueUpdate value) returns Issue|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(ISSUE);
        }
        _ = check sqlClient.runUpdateQuery(issue_id, value);
        return self->/issues/[issue_id].get();
    }

    isolated resource function delete issues/[string issue_id]() returns Issue|persist:Error {
        Issue result = check self->/issues/[issue_id].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(ISSUE);
        }
        _ = check sqlClient.runDeleteQuery(issue_id);
        return result;
    }

    remote isolated function queryNativeSQL(sql:ParameterizedQuery sqlQuery, typedesc<record {}> rowType = <>) returns stream<rowType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor"
    } external;

    remote isolated function executeNativeSQL(sql:ParameterizedQuery sqlQuery) returns psql:ExecutionResult|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor"
    } external;

    public isolated function close() returns persist:Error? {
        error? result = self.dbClient.close();
        if result is error {
            return <persist:Error>error(result.message());
        }
        return result;
    }
}

