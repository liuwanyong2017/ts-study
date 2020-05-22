import axios from "../../src";


axios(
  {
    url: "/extend/get",
    methods: "get",
    params: {
      a: 1, b: 4
    }
  }
);
axios.get("/extend/get");
axios.delete("/extend/delete");
axios.head("/extend/head");
axios.options("/extend/options");
axios.request({
  url: "/extend/get",
  methods: "get",
  params: {
    a: 1, b: 4
  }
});
axios.post(
  "/extend/post", {
    a: 1, b: 4
  }
);
axios.put(
  "/extend/put", {
    a: 1, b: 4
  }
);
axios.patch(
  "/extend/patch", {
    a: 1, b: 4
  }
);
//函数重载：
axios("/extend/get");
axios("/extend/post", {methods: "post", data: {a: 1}});

//接口添加泛型参数：对返回的数据的data字段进行类型断言：

interface User {
  name: string,
  age: number,
  sex: string
}

interface ResponseData<T> {
  message: string,
  result: T
}

const getUser = <T>() => {
  return axios<T>("/extend/getUser").then(
    res => {
      return res.data;
    }
  ).catch(
    e => console.error("err!")
  );
};
const user = async () => {
  const val = await getUser<ResponseData<User>>();
  if (val) {
    console.log(val.result.name);
  }
};
user();

