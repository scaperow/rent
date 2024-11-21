import { Admin, Resource } from "react-admin";
import CustomerList from "./resources/customer/list";
import CustomerCreate from "./resources/customer/create";
import CustomerShow from "./resources/customer/show";
import ProjectList from "./resources/project/list";
import ProjectCreate from "./resources/project/create";
import MaterialList from "./resources/materiel/list";
import MaterialCreate from "./resources/materiel/create";
import MaterialEdit from "./resources/materiel/edit";
import MaterialShow from "./resources/materiel/show";
import MaterialCategoryList from "./resources/material-category/list";
import MaterialCategoryCreate from "./resources/material-category/create";
import MaterialPropertyList from "./resources/material-property/list";
import MaterialPropertyCreate from "./resources/material-property/create";
import UnitList from "./resources/unit/list";
import UnitCreate from "./resources/unit/create";
import { Contacts, Flag, Category, Widgets } from "@material-ui/icons";
import Client from "./provider/parse/client";
//@ts-ignore
import chineseMessages from "ra-language-chinese";
import polyglotI18nProvider from "ra-i18n-polyglot";

const i18nProvider = polyglotI18nProvider(() => chineseMessages, "ch");

const parseConfig = {
  URL: "http://localhost:5000/api",
  JAVASCRIPT_KEY: "javascript",
  APP_ID: "rent-server",
};
const dataProvider = Client(parseConfig);

function Manager() {
  // const [dataProvider, setDataProvider] = useState();
  // const cache = new InMemoryCache();
  // const client = new ApolloClient({
  //     cache,
  //     uri: 'http://localhost:1337/graphql',
  //     headers: {
  //         'X-Parse-Application-Id': 'rent',
  //     },
  //     // Provide some optional constructor fields
  //     name: 'react-web-client',
  //     version: '1.3',
  //     queryDeduplication: false,
  //     defaultOptions: {
  //         watchQuery: {
  //             fetchPolicy: 'cache-and-network',
  //         },
  //     }
  // });

  // const operationNames =  {
  //     //@ts-ignore
  //     [GET_LIST]: resource => `${lowerCase(resource.name)}s`,
  //     //@ts-ignore
  //     [GET_ONE]: resource => `${lowerCase(resource.name)}`,
  //     //@ts-ignore
  //     [GET_MANY]: resource => `${lowerCase(resource.name)}s`,
  //     //@ts-ignore
  //     [GET_MANY_REFERENCE]: resource => `${pluralize(resource.name)}`,
  //     //@ts-ignore
  //     [CREATE]: resource => `create${resource.name}`,
  //     //@ts-ignore
  //     [UPDATE]: resource => `update${resource.name}`,
  //     //@ts-ignore
  //     [DELETE]: resource => `delete${resource.name}`,
  // }

  // useEffect(() => {
  //     if(initProvider){
  //         return;
  //     }

  //     initProvider = true;
  //     buildGraphQLProvider({
  //         client,
  //         buildQuery,
  //         introspection: {
  //             operationNames
  //         },
  //     })
  //         .then((dataProvider: any) => { setDataProvider(dataProvider) });
  // });

  //     if(!initProvider) {
  //         initProvider = true;

  // }

  return (
    <div>
      <Admin dataProvider={dataProvider} i18nProvider={i18nProvider}>
        <Resource
          options={{ label: "工程" }}
          name="project"
          list={ProjectList}
          create={ProjectCreate}
          icon={Flag}
        />
        <Resource
          options={{ label: "客户" }}
          name="customer"
          list={CustomerList}
          create={CustomerCreate}
          show={CustomerShow}
          icon={Contacts}
        />
        <Resource
          options={{ label: "物料" }}
          name="material"
          list={MaterialList}
          create={MaterialCreate}
          edit={MaterialEdit}
          show={MaterialShow}
          icon={Widgets}
        />
        <Resource
          options={{ label: "物料分类" }}
          name="materialCategory"
          list={MaterialCategoryList}
          create={MaterialCategoryCreate}
          icon={Category}
        />
        <Resource
          options={{ label: "物料属性" }}
          name="materialProperty"
          list={MaterialPropertyList}
          create={MaterialPropertyCreate}
          icon={Category}
        />
        <Resource
          options={{ label: "计量单位" }}
          name="unit"
          list={UnitList}
          create={UnitCreate}
        />
      </Admin>
    </div>
  );
}

export default Manager;
