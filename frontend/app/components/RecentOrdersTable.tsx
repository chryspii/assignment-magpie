export function RecentOrdersTable({ orders }: any) {
  return (
    <table className='w-full text-sm'>
      <thead>
        <tr className='border-b'>
          <th className='text-left p-2'>Order ID</th>
          <th className='text-left p-2'>Status</th>
          <th className='text-right p-2'>Total</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order: any) => (
          <tr key={order.externalId} className='border-b'>
            <td className='p-2'>{order.externalId}</td>
            <td className='p-2'>{order.status}</td>
            <td className='p-2 text-right'>${order.totalPrice}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
