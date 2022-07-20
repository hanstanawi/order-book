const TableHeader = () => {
  return (
    <thead className='w-full text-broken-white text-sm px-3'>
      <tr>
        <th scope='col' className='text-end font-normal pl-2'>
          Price (USD)
        </th>
        <th scope='col' className='text-end font-normal'>
          Size
        </th>
        <th scope='col' className='text-end font-normal pr-2'>
          Total
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
