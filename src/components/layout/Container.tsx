import { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <div className='bg-dark-blue w-1/5 mx-auto rounded-md py-4 shadow-2xl'>
      {children}
    </div>
  );
};

export default Container;
