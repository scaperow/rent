import Parse from "parse";
import { GET_LIST, GET_MANY, GET_MANY_REFERENCE, GET_ONE } from "react-admin";

export default interface Service {
  [GET_LIST]: (query: Parse.Query) => Promise<void>;
  [GET_MANY]: (query: Parse.Query) => Promise<void>;
  [GET_MANY_REFERENCE]: (query: Parse.Query) => Promise<void>;
  [GET_ONE]: (query: Parse.Query) => Promise<void>;
}
