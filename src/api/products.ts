import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get('https://fakestoreapi.com/products');
  return data;
};

export const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
};
