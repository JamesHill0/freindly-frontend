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
    viewType,
    error,
    isProductSaving,
    onChangeKeyword,
    onChangeApi,
    onSubmit,
    onClickProductSave,
    onClickProductDiscard,
    onClickView,
  } = useProductScreenerState();

  // view-related functions
  function getViewTypeProps(view) {
    if (viewType !== view)
      return { bgColor: "bg-blue-200", color: "text-gray-800" };
    return {};
  }

  function getCardProps() {
    if (viewType === "single") return { className: "w-full max-w-full" };
    return {};
  }

  return (
    <div className="bg-indigo-100 min-h-full">
      <div className="bg-indigo-400">
        {/* Header  */}
        <div className="xl:container xl:mx-auto px-4 pb-4">
          <span className="text-6xl text-gray-900">
            Friendly <small className="text-4xl"> Product Screener</small>
          </span>
          <form className="w-full max-w-lg mb-4" onSubmit={onSubmit}>
            <div className="flex flex-row items-center mb-2">
              <div className="w-1/3">
                <label
                  className="block text-gray-800 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="select-api"
                >
                  Select an API
                </label>
              </div>
              <div className="w-2/3">
                <Select
                  id="select-api"
                  value={api}
                  onChange={onChangeApi}
                  disabled={apis.length === 0}
                >
                  {apis && apis.map((a) => <option key={a}>{a}</option>)}
                </Select>
              </div>
            </div>

            <div className="flex flex-row items-center mb-2">
              <div className="w-1/3">
                <label
                  className="block text-gray-800 font-bold md:text-right mb-1 md:mb-0 pr-4"
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
                  placeholder={"Enter a keyword to search for"}
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-1/3"></div>
              <div className="w-2/3">
                <Button
                  type="submit"
                  disabled={!allowSubmit || productsLoading}
                  // bgColor="bg-indigo-200"
                  // color="text-gray-800"
                >
                  {!productsLoading ? (
                    <>Submit</>
                  ) : (
                    <LoadingIndicator height={20} width={60} />
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="h-full">
        {/* Body  */}

        {error && (
          <div className="flex flex-row justify-center pt-4">
            <div className="w-4/12 max-w-full bg-red-200 border border-red-500 rounded p-2 text-sm">
              An error has been encountered:
              <pre className="bg-red-300 p-2">{error}</pre>
              Please contact an administrator.
            </div>
          </div>
        )}

        <div className="xl:container xl:mx-auto px-4 pt-4">
          {products.length > 0 && !productsLoading && (
            <div className="">
              <div className="flex flex-row items-center">
                <div className="flex-1">
                  <span className="text-2xl font-bold">
                    Products Found ({products.length}):
                  </span>
                </div>
                <div className="flex flex-row">
                  <Button
                    {...getViewTypeProps("tile")}
                    onClick={onClickView("tile")}
                  >
                    Tile
                  </Button>
                  <Button
                    {...getViewTypeProps("single")}
                    onClick={onClickView("single")}
                  >
                    Single
                  </Button>
                </div>
              </div>
              <div className="flex flex-row flex-wrap place-content-around my-grid">
                {products.map((p, i) => (
                  <Card key={i} {...getCardProps()}>
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
    </div>
  );
}

export default ProductScreener;
