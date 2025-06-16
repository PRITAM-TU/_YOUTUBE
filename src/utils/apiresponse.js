class Apiresponse{
    constructor(stausCode,data,message,success=true){
        this.statusCode = stausCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400 ? true : false;
    }
}

export { Apiresponse };