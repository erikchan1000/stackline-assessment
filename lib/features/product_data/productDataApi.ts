import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import data from '@/public/stackline_frontend_assessment_data_2021.json'

interface ProductInfoInterface {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  brand: string;
  reviews: {
    customer: string;
    review: string;
    score: number;
  }[];
  retailer: string;
  details: string[];
  tags: string[];
  sales: {
    weekEnding: string;
    retailSales: number;
    wholesaleSales: number;
    unitsSold: number;
    retailerMargin: number;
  }[];
}

interface apiResponse {
  data: ProductInfoInterface[];
}

export const productDataApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api/counter' }),
  reducerPath: 'productDataApi',
  tagTypes: ['ProductInfo'],
  endpoints: (build) => ({
    getProductData: build.query<apiResponse, void>({
      query: () => ({
        url: '/',
        method: 'GET'
      }),
      providesTags: ['ProductInfo'],
      transformResponse: (response: Response) => {
        return { data: data }
      }
    }),
  }),
});
  
export const { useGetProductDataQuery } = productDataApi;