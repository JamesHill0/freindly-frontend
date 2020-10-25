import { getApiProducts, getServices, saveProducts } from "../services/api";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";

export const useProductScreenerState = (props) => {
  const [apis, setApis] = useState([]);
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [api, setApi] = useState("");
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsSaving, setProductsSaving] = useState([]);
  const [viewType, setViewType] = useState("tile");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      await getServices()
        .then((response) => {
          setApis(response.data);
        })
        .catch((error) => {
          setError(`${error.name} - ${error.message}`);
          return [];
        });
    };
    fetchServices();
  }, []);

  // set selected api when apis is changed
  useEffect(() => {
    if (apis.length > 0) {
      setApi(apis[0]);
    }
  }, [apis]);

  useEffect(() => {
    if (keyword.trim() !== "") {
      setAllowSubmit(true);
    } else {
      setAllowSubmit(false);
    }
  }, [keyword]);

  const isProductSaving = (name) => {
    return productsSaving.includes(name);
  };

  const onChangeApi = (e) => {
    setApi(e.target.value);
  };

  const onChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // TODO query products
    // keyword.trim()
    setError("");
    setProductsLoading(true);

    // setTimeout(function () {
    //   // setProducts(PRODUCTS);
    //   setProductsLoading(false);
    // }, 1000);

    const fetchApiProducts = async () => {
      await getApiProducts(api, keyword.trim())
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          setError(`${error.name} - ${error.message}`);
          return [];
        })
        .finally(() => {
          setProductsLoading(false);
        });
    };
    fetchApiProducts();
  };

  const onClickProductSave = (name) => (e) => {
    setProductsSaving((ps) => [...ps, name]);
    setError("");

    // setTimeout(function () {
    //   setProducts((products) => products.filter((p) => name !== p.name));
    //   setProductsSaving((ps) => products.filter((p) => p !== name));
    //   toast(`Saved: ${name}`);
    // }, 5000);

    const product = products.filter((p) => name === p.name);
    const uploadProduct = async () => {
      await saveProducts(api, product)
        .then((response) => {
          toast.info(`Saved: ${name}`);
          setProducts((products) => products.filter((p) => name !== p.name));
        })
        .catch((error) => {
          setError(`${error.name} - ${error.message}`);
          return [];
        })
        .finally(() => {
          setProductsSaving((products) => products.filter((p) => p !== name));
        });
    };
    uploadProduct();
  };

  const onClickProductDiscard = (name) => (e) => {
    // no delay because we don't connect to server
    setProducts((products) => products.filter((p) => name !== p.name));
    toast.info(`Discarded: ${name}`);
  };

  const onClickView = (name) => (e) => {
    setViewType(name);
  };

  return {
    apis,
    products,
    keyword,
    api,
    allowSubmit,
    productsLoading,
    viewType,
    error,
    isProductSaving,
    // error,
    onChangeApi,
    onChangeKeyword,
    onSubmit,
    onClickProductSave,
    onClickProductDiscard,
    onClickView,
  };
};
