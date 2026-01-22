export function TopProductsTable({ products }: any) {
  return (
    <table className='w-full text-sm'>
      <thead>
        <tr className='border-b'>
          <th className='text-left p-2'>Product</th>
          <th className='text-right p-2'>Price</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product: any) => (
          <tr key={product.id} className='border-b'>
            <td className='p-2'>{product.name}</td>
            <td className='p-2 text-right'>${product.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
