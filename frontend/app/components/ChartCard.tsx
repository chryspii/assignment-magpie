export default function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className='bg-white rounded-xl shadow p-4 flex flex-col'>
      <div className='mb-3 text-center'>
        <h2 className='text-base md:text-lg font-semibold text-gray-800'>
          {title}
        </h2>
      </div>

      <div className='w-full'>
        {children}
      </div>
    </div>
  );
}
