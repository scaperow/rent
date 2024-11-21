import { TabPanel } from "@material-ui/lab";
import { isEmpty, set } from "lodash";
import { ReactNode } from "react";
import { Create, FormTab, TabbedForm } from "react-admin";
import { setPointer, setPointerArray, setRelation } from "../utility";

import {
  BaseInformationArea,
  PricesArea,
  StockArea,
  transform,
  UnitArea,
  VariantArea,
} from "./common";

function create(props: any) {
  const opts = {
    ...props,
    transform,
  };

  return (
    <Create {...opts}>
      <TabbedForm mode="onChange">
        <FormTab label="基本信息" key="basic">
          <BaseInformationArea props={opts}></BaseInformationArea>
        </FormTab>
        <FormTab label="计量单位" key="units">
          <UnitArea props={props}></UnitArea>
        </FormTab>
        <FormTab label="其他型号" key="variant">
          <VariantArea props={props}></VariantArea>
        </FormTab>
        <FormTab label="价格列表" key="prices">
          <PricesArea props={props}></PricesArea>
        </FormTab>
        <FormTab label="库存" key="stock">
          <StockArea props={props}></StockArea>
        </FormTab>
      </TabbedForm>
    </Create>
  );
}

export default create;
