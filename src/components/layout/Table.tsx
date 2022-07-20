import { ReactNode } from 'react';

type TableProps = {
  children: ReactNode;
};

const Table = ({ children }: TableProps) => {
  return (
    <table className='table-fixed w-full px-2'>
      <colgroup>
        <col span={1} style={{ width: '30%' }} />
        <col span={1} style={{ width: '30%' }} />
        <col span={1} style={{ width: '40%' }} />
      </colgroup>
      {children}
    </table>
  );
};

export default Table;
