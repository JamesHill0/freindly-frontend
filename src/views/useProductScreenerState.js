import { APIS, PRODUCTS } from "../constants";
import { useEffect, useState } from "react";

import Axios from "axios";
import { getServices } from "../services/api";
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
    // setApis(APIS);
    const fetchServices = async () => {
      const result = await Axios.get(`localhost:5000/api/v1/apis`)
        .then((response) => {
          return response;
        })
        .catch((e) => {
          console.error(e);
          setError(`${e.name} - ${e.message}`);
          return [];
        });
      console.log(result);
      setApis(result);
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

  // useEffect(() => {
  //   if (products.length > 0) setProductsLoading(false);
  // }, [products]);

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
    setProductsLoading(true);

    setTimeout(function () {
      setProducts(PRODUCTS);
      setProductsLoading(false);
    }, 1000);
  };

  const onClickProductSave = (name) => (e) => {
    setProductsSaving((ps) => [...ps, name]);

    setTimeout(function () {
      setProducts((products) => products.filter((p) => name !== p.name));
      setProductsSaving((ps) => products.filter((p) => p !== name));
      toast(`Saved: ${name}`);
    }, 5000);
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
