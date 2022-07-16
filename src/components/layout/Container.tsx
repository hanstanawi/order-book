import { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <div className='bg-dark-blue w-1/5 h-5/6 mx-auto rounded-sm'>
      {children}
    </div>
  );
};

export default Container;
