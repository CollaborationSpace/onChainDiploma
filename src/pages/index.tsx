import OnChainDiplomaSDK from '../../blockchain/sdk';

import type { MenuProps } from 'antd';
import React, { useState } from 'react';
import LayoutMain from "../components/Layout";


const HomeContent = () => {
  return (
    <h1>test</h1>
  )
}

export default function Home() {
  const test = new OnChainDiplomaSDK();

  return (
    <LayoutMain childComponent={<HomeContent/>}/>
  );
}