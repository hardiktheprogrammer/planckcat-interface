
import { useState, useEffect } from "react";
import styled from "styled-components";
import { TEXT } from "../../theme/theme";
import { useContract, useSigner, useAccount, useContractWrite } from "wagmi";
import PlanckCatMinter_ABI from '../../constants/abis/PlanckCatMinter.json';
import { useCanClaim } from "../../hooks/useCanClaim";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  margin: 50px auto auto auto;
  flex: 1;
`;

const ClaimButton = styled.button`
  background: #56CCF2; 
  border: 2px solid #56CCF2;
  border-radius: 8px;
  color: #f2f2f2;
  font-size: 12px;
  cursor: pointer;
  padding: 12px;
  width: 200px;
  font-family: 'Press Start 2P';
  box-shadow: 0 0 5px #56ccf2;
  margin: 24px auto auto auto;
`;

export function Claim() {
  const [{ data: accountData }] = useAccount();
  const claimable = useCanClaim(accountData?.address);

  // const claimable = [1,3]
  return (
    <Container>
      {claimable == null && (
        <TEXT.StandardBody m={'auto'}>
          Checking for claimable tokens...
        </TEXT.StandardBody>
      )}
      {claimable && claimable.length === 0 && (
        <TEXT.StandardBody m={'auto'}>
          You have no claimable tokens currently.
        </TEXT.StandardBody>
      )}
      {claimable && claimable.length > 0 && (
        <>
          <TEXT.StandardBody m={'auto auto 0 auto'}>
            You have {claimable.length} tokens available to claim.
          </TEXT.StandardBody>
          <ClaimButton>
            Claim
          </ClaimButton>
        </>
      )}
    </Container>
  )
}
