import { each, get, isArray, isEmpty, map, set, unset } from "lodash";
import Parse from "parse";
import { RaRecord } from "react-admin";
import { isTemplateExpression } from "typescript";

export const setPointer = (postData: object, className: string, fieldName: string, value?: any) => {
  const fieldValue = value || get(postData, fieldName);

  if (!isEmpty(fieldValue)) {
    const pointer = Parse.Object.extend(className).createWithoutData(fieldValue);

    set(postData, fieldName, pointer);
  }
};

export const fetchRelation = async (responseData: any, resourceName: string, relationField: string) => {
  const resource = Parse.Object.extend(resourceName).createWithoutData(responseData.id);
  const relation = resource.relation(relationField);
  const query = relation.query();
  const result = await query.findAll();
  const relationDatas = map(result, (item: any) => ({
    id: item.id,
    ...item.attributes,
  }));

  set(responseData, relationField, relationDatas);
};

export const setRelation = (postData: object, relationResource: string, relationField: string, resourceName: string, valueField: string) => {
  const $parseObject = getParseObjectFromRecord(resourceName, postData);
  const relation = $parseObject.relation(relationField);
  const relationClass = Parse.Object.extend(relationResource);
  const fieldValue = get(postData, relationField);

  if (isArray(fieldValue)) {
    each(fieldValue, async (value: object) => {
      const id = get(value, valueField);

      if (id) {
        const relationData = relationClass.createWithoutData(id);

        relation.add(relationData);
      }
    });

    unset(postData, relationField);
    set(postData, "$parseObject", $parseObject);
  }
};

export const setNewPointers = (postData: object, resourceName: string, relationField: string, relationResource: string, transform?: (postData: object) => void) => {
  const $parseObject = getParseObjectFromRecord(resourceName, postData);
  const fieldValue = get(postData, relationField);
  const relationClass = Parse.Object.extend(relationResource);

  if (isArray(fieldValue)) {
    each(fieldValue, async (value: object) => {
      let relation = new relationClass();
      transform?.(value);
      relation.set("material", $parseObject);
      await relation.save(value);
    });

    unset(postData, relationField);
    set(postData, "$parseObject", $parseObject);
  }
};

export const getParseObjectFromRecord = (resource: string, record: object): Parse.Object => {
  let $parseObject = get(record, "$parseObject");

  if (!$parseObject) {
    $parseObject = Parse.Object.extend(resource).createWithoutData(get(record, "id"));
  }

  return $parseObject;
};

export const setPointerArray = (postData: object, arrayField: string, className: string, fieldName: string) => {
  const arrayValue = get(postData, arrayField);

  each(arrayValue, (item) => {
    const fieldValue = get(item, fieldName);

    if (fieldValue) {
      const pointer = Parse.Object.extend(className).createWithoutData(fieldValue);

      set(item, fieldName, pointer);
    }
  });

  // if (!isEmpty(fieldValue)) {
  //   const pointer = Parse.Object.extend(className).createWithoutData(fieldValue);

  //   set(postData, fieldName, pointer);
  // }
};

export const canPropertyRemoveByName = (formData: any, field: string) => {
  return (index: any) => {
    const record = get(formData, `${field}[${index}]`);
    return !isEmpty(get(record, "name"));
  };
};

export const canPropertyRemoveById = (formData: any, field: string) => {
  return (index: any) => {
    const record = get(formData, `${field}[${index}]`);
    return !isEmpty(get(record, "id"));
  };
};

// export const setNewRelation = (
//   postData: object,
//   relationResource: string,
//   relationField: string,
//   resourceName: string,
//   valueField: string
// ) => {};

// export const plainObject = (
//   data: object,
//   fieldName: string,
//   valueField: string
// ) => {
//   set(data, fieldName, get(data, fieldName, valueField));
// };
