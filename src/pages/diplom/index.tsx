"use client"

import LayoutMain from '@/components/Layout';
import { FC, useState } from 'react';
import OnChainDiplomaSDK from '../../../blockchain/sdk';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const DiplomContent: FC = () => {

  const test = new OnChainDiplomaSDK();

  // test.

  return (
    <>
      <div>Страница диплома</div>
      <div>fkdjfkj</div>
    </>
  );
};

const Diplom = () => {
  const tes = useRouter();

  return <LayoutMain childComponent={<DiplomContent />}> </LayoutMain>;
};

export default Diplom;
