import React from 'react';
import styled from 'styled-components';
import { ConnectWallet } from './components/ConnectWallet/ConnectWallet';
import { Header } from './components/Header/Header';
import { TEXT } from './theme/theme';
import { useAccount, useConnect, useContract, useContractRead, useNetwork } from 'wagmi';
import PlanckCat from './assets/planck-cat.png';
import { ShellTerminal } from './components/ShellTerminal/ShellTerminal';
import { useWalletTokens } from './state/wallet/hooks';
import PlanckCat_ABI from './constants/abis/PlanckCat.json';

export const AppWrapper = styled.div`
  background-color: ${({theme}) => theme.bg1};
  height: 100%;
  min-height: 100vh;
  width: 100vw;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  margin: 50px auto auto auto;
  flex: 1;
`;

const ImgWrapper = styled.div`
  display: flex;
  margin: auto;
  height: 200px;
  width: 200px;
`;

function App() {
  const [{ data: accountData }] = useAccount();
  const [{ data: networkData }] = useNetwork();
  const tokens = useWalletTokens(accountData?.address)
  // const [{ data, error, loading }, read] = useContractRead(
  //   {
  //     addressOrName: '0x60a2152a048CB2DAFd44F4760364c1BEdf7eb8C5',
  //     contractInterface: PlanckCat_ABI,
  //   },
  //   'balanceOf',
  //   {
  //     args: '0x22c17332f5527703d34121704c036d713418c232'
  //   }
  // )

  console.log('networkData ', networkData);
  console.log('tokens: ', tokens);

  return (
    <AppWrapper>
      <Header />
      <Body>
        { accountData ? (
          <TEXT.StandardBody m={'auto'}>
            This wallet does not currently hold a PlanckCat.
          </TEXT.StandardBody>
        ):(
          <>
            {/* <ImgWrapper>
              <img src={PlanckCat} />
            </ImgWrapper> */}
            
            <ShellTerminal />
          </>
        )}
      </Body>
    </AppWrapper>
  );
}

export default App; 
