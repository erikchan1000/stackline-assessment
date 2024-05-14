'use client';

import { useSelector } from "react-redux"
import { useGetProductDataQuery } from "@/lib/features/product_data/productDataApi"
import Loading from "./loading"
import { ProductInfo } from "@/app/components/product_info"
import "./styles.scss"
import { DataVisualization } from "@/app/components/data_visualization"

export default function IndexPage() {
  const { data, error, isLoading } = useGetProductDataQuery();
  const selectedData = data?.data[0];

  return (
    <div className="main-container">
      <div className="left-container">
        {isLoading && <Loading />}
        {data && selectedData && <ProductInfo {...selectedData} />}
      </div>
      <div className="right-container">
        {data && selectedData && <DataVisualization sales={selectedData?.sales}/>}
      </div>
    </div>
  )
}
