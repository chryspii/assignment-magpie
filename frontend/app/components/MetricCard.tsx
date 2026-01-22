type Props = {
  title: string;
  value: string | number;
};

export default function MetricCard({ title, value }: Props) {
  return (
    <div className='rounded-xl bg-white p-4 shadow'>
      <p className='text-sm text-gray-500'>{title}</p>
      <p className='mt-2 text-2xl font-bold'>{value}</p>
    </div>
  );
}
