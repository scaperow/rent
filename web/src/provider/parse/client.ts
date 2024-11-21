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

import Parse from "parse";
import shims from "./shim";
import _, {
  assign,
  camelCase,
  chain,
  each,
  forEach,
  get,
  isArray,
  isEmpty,
  isFunction,
  keys,
  keysIn,
  lowerCase,
  map,
  omit,
  pick,
  set,
  unset,
  values,
} from "lodash";
import { ListSubheader } from "@material-ui/core";

interface ClientParameter {
  pagination: {
    page: number;
    perPage: number;
  };
  sort: {
    field: string;
    order: "DESC" | "ASEC";
  };
  filter: any;
  target: string;
  id: string;
  data: any;
  ids: string[];
}

const setRelation = async (shim: object, paramsData: object, resObj?: Parse.Object) => {
  //resource, params.data, resObj
  const keys = keysIn(shim);

  await each(keys, async (key) => {
    const { resource, on, picker } = get(shim, key) || {};
    const value = get(paramsData, key);

    switch (on) {
      case "pointer":
        const pointer = Parse.Object.extend(resource).createWithoutData(value);

        set(paramsData, key, pointer);
        break;

      case "relation":
        if (!resObj) {
          throw new Error("resObj can't be empty");
        }

        const relation = resObj.relation(key);
        const relationClass = Parse.Object.extend(resource);

        each(value, async (value: object) => {
          const id = get(value, picker);

          if (id) {
            const relationData = relationClass.createWithoutData(id);

            relation.add(relationData);
          }
        });

        unset(paramsData, key);
        break;

      // case "object":
      //   each(keysIn(resource as object), (key) => {
      //     const childShim = get(resource, "shim");
      //     const childParams = get(params.data, key);

      //     setRelation(childShim, resObj, childParams);
      //   });

      //   break;

      case "array":
        if (!isArray(value)) {
          throw new Error("value should be an array");
        }

        each(value, (item) => {
          setRelation(resource, item);
        });
        break;
    }
  });
};

const factory = (params: { URL: string; APP_ID: string; JAVASCRIPT_KEY: string }) => {
  const { URL, APP_ID, JAVASCRIPT_KEY } = params;

  if (Parse.applicationId == null || Parse.javaScriptKey == null) {
    Parse.initialize(APP_ID, JAVASCRIPT_KEY);
    Parse.serverURL = URL;
  }

  return async (type: string, resource: string, params: ClientParameter) => {
    const resourceObj = Parse.Object.extend(resource);
    const query = new Parse.Query(resourceObj);
    const shim = get(shims, `${type}.${resource}`);
    const resObj = get(params.data, "$parseObject", new resourceObj());
    const afterSelect = get(params, "meta.afterSelect", (record: any) => {
      return Promise.resolve(record);
    });
    unset(params.data, "$parseObject");

    switch (type) {
      case GET_LIST: {
        console.log(params);
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const { filter } = params;
        query.limit(perPage);
        query.skip((page - 1) * perPage);

        if (order === "DESC") {
          query.descending(field);
        } else if (order === "ASEC") {
          query.ascending(field);
        }

        each(keys(omit(filter, "$cover", "$proxy", "q")), (f) => {
          query.equalTo(f, filter[f]);
        });
        // Object.keys(omit(filter, "$cover", "$proxy", 'q')).forEach((f) =>
        // query.matches(f, filter[f], "i")

        // );

        const proxy = get(filter, "$proxy");
        if (isFunction(proxy)) {
          proxy(query);
        }

        if (!isEmpty(filter.q)) {
          const keywordField = get(filter, "$q");
          if (!isEmpty(keywordField)) {
            query.matches(keywordField, filter.q, "i");
          }
        }

        // const $cover = get(filter, "$cover");
        // forEach($cover, (value, key) => {
        //   const proxy = get(value, $cover);
        //   forEach(proxy, (params, name) => {
        //     //@ts-ignore
        //     query[name](params);
        //   });
        // });

        // Object.keys($cover).forEach((key: string) => {
        //     //@ts-ignore
        //     query[key](...get(filter, '$cover' + '.' + key));
        // });

        const results = await query.find();
        const count = await query.count();
        return {
          total: count,
          data: results.map((o) => ({ id: o.id, ...o.attributes })),
        };
      }
      case GET_ONE: {
        // const subQueries: { [index: string]: Parse.Query } = {};
        // const getOneShim = get(shims, `${type}.${resource}`);
        // const keys = keysIn(getOneShim);
        // const subObjects: object = {};
        const result = await query.get(params.id);
        const resultData = await afterSelect({
          id: result.id,
          ...result.attributes,
        });

        // forEach(keys, (key) => {
        //   const { on } = get(getOneShim, key) || {};

        //   switch (on) {
        //     case "pointer":
        //       set(resultData, key, get(resultData, key + ".id"));
        //       break;

        //     case "relation":
        //       const relation = result.relation(key);
        //       set(subQueries, key, relation.query());
        //   }
        // });

        // await Promise.all(
        //   map(keysIn(subQueries), (key: string) => {
        //     return new Promise<void>(async (resolve) => {
        //       const subQuery: Parse.Query = subQueries[key];
        //       const subData = await subQuery.find();
        //       set(
        //         subObjects,
        //         key,
        //         subData.map((o) => o.id)
        //       );

        //       resolve();
        //     });
        //   })
        // );

        return {
          data: resultData,
        };
      }
      case GET_MANY: {
        const query = new Parse.Query(resourceObj).containedIn("objectId", params.ids || []);
        const results = await query.findAll();
        return {
          total: results.length,
          data: results.map((o) => ({ id: o.id, ...o.attributes })),
        };
      }
      case GET_MANY_REFERENCE: {
        resObj.id = params.id;

        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const relationField = get(params, "meta.field");
        const refQuery = resObj.relation(relationField).query();
        const count = await refQuery.count();

        refQuery.limit(perPage);
        refQuery.skip((page - 1) * perPage);
        if (order === "DESC") refQuery.descending(field);
        else if (order === "ASEC") refQuery.ascending(field);

        const results = await refQuery.find();
        return {
          total: count,
          data: results.map((o: any) => ({ id: o.id, ...o.attributes })),
        };
      }
      case CREATE: {
        // Object.keys(params.data).map(key=>resObj.set(key, params.data[key]));
        try {
          // await setRelation(shim, params.data, resObj);
          const r = await resObj.save(params.data);
          return { data: { id: r.id, ...r.attributes } };
        } catch (error) {
          throw error;
        }
      }
      case UPDATE: {
        try {
          const obj = await query.get(params.id);
          const keys = Object.keys(params.data).filter((o) =>
            o == "id" || o == "createdAt" || o == "updatedAt" ? false : true
          );
          const data = keys.reduce((r: any, f, _i) => {
            r[f] = params.data[f];
            return r;
          }, {});
          // console.log(obj);
          const r = await obj.save(data);
          // console.log(r);
          // console.log({data: {id: r.id, ...r.attributes}});
          return { data: { id: r.id, ...r.attributes } };
        } catch (error: any) {
          throw Error(error);
        }
      }
      case UPDATE_MANY: {
        try {
          const qs = await Promise.all(params.ids.map((id) => new Parse.Query(resourceObj).get(id)));
          qs.map((q) => q.save(params.data));
          return { data: params.ids };
        } catch {
          throw Error("Failed to update all");
        }
      }
      case DELETE: {
        try {
          const obj = await query.get(params.id);
          const data = { data: { id: obj.id, ...obj.attributes } };
          await obj.destroy();
          return data;
        } catch (error) {
          throw Error("Unable to delete");
        }
      }
      case DELETE_MANY: {
        try {
          const qs = await Promise.all(params.ids.map((id) => new Parse.Query(resourceObj).get(id)));
          await Promise.all(qs.map((obj) => obj.destroy()));
          return { data: params.ids };
        } catch (error) {
          throw Error("Unable to delete all");
        }
      }
    }
  };
};

export default factory;
