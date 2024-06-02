import styled from "styled-components";

export const IndexPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #1e2832;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;
export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const LogoWrapper = styled.div`
  width: 200px;
  height: 200px;
  animation: rotate-logo 5s 0s linear infinite;
  img {
    width: 100%;
    height: 100%;
  }
  @keyframes rotate-logo {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }
`;
export const LinkBox = styled.div`
  display: flex;
  gap: 8px;
  a {
    color: #ededed;
    &:visited {
      color: aqua;
    }
  }
`;
