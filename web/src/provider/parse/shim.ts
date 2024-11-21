import { set } from "lodash";
import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY,
  Resource,
} from "react-admin";

const schemas = {
  [GET_LIST]: {
    project: ["id", "name", "customer.name"],
  },
  [CREATE]: {
    customer: {
      resource: "customer",
      on: "pointer",
    },
    // material: {
    //   category: {
    //     resource: "materialCategory",
    //     on: "pointer",
    //   },
    //   units: {
    //     on: "relation",
    //     resource: {
    //       unit: {
    //         resource: "unit",
    //         on: "pointer",
    //       }
    //     }
    //   },
    //   properties: {
    //     resource: "materialProperty",
    //     on: "relation",
    //     picker: "property",
    //   },
    // },
  },
};

set(schemas, UPDATE, schemas.CREATE);

// var material = {
//   /// object array
//   units: [
//     {
//       ///  conversion object
//       factory: 1,
//       unit: {
//         // pointer to relation
//       },
//     },
//   ],
// };

export default schemas;
