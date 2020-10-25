import Card, {
  CardBody,
  CardFooter,
  CardFooterButton,
  CardHeader,
} from "../components/Card";

import Button from "../components/Button";
import Input from "../components/Input";
import JSONPretty from "react-json-pretty";
import LoadingIndicator from "../components/LoadingIndicator";
import React from "react";
import Select from "../components/Select";
import { useProductScreenerState } from "./useProductScreenerState";

function ProductScreener(props) {
  const {
    api,
    apis,
    products,
    keyword,
    allowSubmit,
    productsLoading,
    isProductSaving,
    onChangeKeyword,
    onChangeApi,
    onSubmit,
    onClickProductSave,
    onClickProductDiscard,
  } = useProductScreenerState();

  return (
    <div className="bg-gray-300 h-full">
      <div className="xl:container xl:mx-auto px-4 h-full">
        <span className="text-6xl">
          Friendly <small className="text-4xl"> Product Screener</small>
        </span>
        <form className="w-full max-w-lg mb-4" onSubmit={onSubmit}>
          <div className="flex flex-row items-center mb-2">
            <div className="w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="select-api"
              >
                Select an API
              </label>
            </div>
            <div className="w-2/3">
              <Select id="select-api" value={api} onChange={onChangeApi}>
                {apis && apis.map((a) => <option key={a}>{a}</option>)}
              </Select>
            </div>
          </div>

          <div className="flex flex-row items-center mb-2">
            <div className="w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="input-keyword"
              >
                Enter Keyword
              </label>
            </div>
            <div className="w-2/3">
              <Input
                type="text"
                id="input-keyword"
                value={keyword}
                onChange={onChangeKeyword}
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-1/3"></div>
            <div className="w-2/3">
              <Button type="submit" disabled={!allowSubmit || productsLoading}>
                {!productsLoading ? (
                  <>Submit</>
                ) : (
                  <LoadingIndicator height={20} width={60} />
                )}
              </Button>
            </div>
          </div>
        </form>

        {products.length > 0 && (
          <div className="border-t border-gray-400 pt-4 bg-green-400">
            <span className="text-2xl font-bold">
              Products Found ({products.length}):
            </span>
            <div className="flex flex-row">
              {/* <ImpulseSpinner
          loading={productsLoading}
          size={80}
          frontColor={"#b794f4"}
        /> */}
            </div>
            <div className="flex flex-row flex-wrap place-content-around my-grid">
              {products.map((p, i) => (
                <Card key={i}>
                  <CardHeader>
                    {p.hasOwnProperty("name") ? p.name : "Product"}
                  </CardHeader>
                  <CardBody className="overflow-y-auto">
                    <JSONPretty className="text-sm" data={p}></JSONPretty>
                  </CardBody>

                  <CardFooter>
                    <CardFooterButton
                      onClick={onClickProductSave(p.name)}
                      disabled={isProductSaving(p.name)}
                    >
                      {!isProductSaving(p.name) ? (
                        "Save"
                      ) : (
                        <LoadingIndicator className="" />
                      )}
                    </CardFooterButton>
                    <CardFooterButton
                      type="neutral"
                      onClick={onClickProductDiscard(p.name)}
                      disabled={isProductSaving(p.name)}
                    >
                      Discard
                    </CardFooterButton>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductScreener;
