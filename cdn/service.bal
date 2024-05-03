import ballerina/http;
import ballerina/io;
import ballerina/mime;


# A service representing a network-accessible API
# bound to port `9090`.
service / on new http:Listener(8080) {
	resource function post store(http:Request the_req) returns string|error {
		mime:Entity[] all_entities = check the_req.getBodyParts();
		string the_dest = "";
		stream<byte[], io:Error?>  original_file = new();

		foreach var part in all_entities {
			string base_type = getBaseType(part.getContentType());
			io:println("current entity type = " + base_type);

			if base_type == mime:APPLICATION_JSON {
				var payload = check part.getJson();
				string issue_id = check payload.issue_id.ensureType();
				string converted_date = check payload.date.ensureType();
				the_dest = string `../fixna_image_store/${issue_id}-${converted_date}.jpeg`;
				io:println("the_dest is " + the_dest);
			} else if base_type == mime:IMAGE_JPEG {
				var ori_img_content = check  part.getByteStream();
				original_file = ori_img_content;	
			}
		}

		if ((the_dest is string) && (the_dest.length() > 0) && (original_file is stream<byte[], io:Error?>)) {
			io:Error? res = io:fileWriteBlocksFromStream(the_dest, original_file);

			if res is error {
				io:println("Error while saving the file");
			}
		} else {
			io:println("the types mismatch");
		} 
	
		return the_dest;
	}
}

function getBaseType(string contentType) returns string {
    var result = mime:getMediaType(contentType);
    if result is mime:MediaType {
        return result.getBaseType();
    }
    panic result;
}
