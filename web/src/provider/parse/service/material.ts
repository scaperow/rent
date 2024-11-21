import Service from "./service";
import Parse from "parse";
import { CREATE, GET_LIST, GET_ONE } from "react-admin";

const MaterialService: Partial<Service> = {
  [GET_LIST]: async (query: Parse.Query) => {
    query.include();
  },
  [GET_ONE]: async (query: Parse.Query) => {},
};

export default MaterialService;
