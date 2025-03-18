export const useApiFakeStore = async (id) => {
  const productosApi = await fetch(id ? `https://fakestoreapi.com/products/${id}` : 'https://fakestoreapi.com/products')
  const data = await productosApi.json()
  return data
}
