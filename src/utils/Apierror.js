class ApiError extends error{
    constructor(
        message = "Something went wrong",
        statusCode = 500,
        isOperational = true,
        error=[],
        stack=""
    ){
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.errors = this.errors || error;
        this.stack = stack;
        this.data=null;
        this.success = false;
        if(stack){
            this.stack = stack;
    }else{
            Error.captureStackTrace(this, this.constructor);
        } 
    }      
}
export { ApiError };