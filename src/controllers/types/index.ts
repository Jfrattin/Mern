/**
 *Basic json response for controlers
 */

 export type BasicResponse = {
    message: string
 }


/**
 *Error json response for controlers
 */

 export type ErrorResponse = {
    error: string,
    message: string
 }

 export type BasicgoodbyeResponse = {
   message: string;
   date: string;
}
