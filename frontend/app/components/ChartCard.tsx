export default function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className='bg-white rounded-xl shadow p-4 flex flex-col'>
      <div className='mb-2 text-sm font-semibold text-gray-700'>
        {title}
      </div>

      <div className='flex-1 flex items-center justify-center'>
        {children}
      </div>
    </div>
  );
}
