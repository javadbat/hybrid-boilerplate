import styled from "styled-components";

export const PageLoading = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    --jb-loading-color:rgb(13, 113, 228);
    --jb-loading-width:4rem;
    --jb-loading-height:4rem;
`;
export const PageLoaderTextWrapper = styled.div`
    margin-top: 20px;
`
export const PageLoaderText = styled.span`
    font-size: 13px;
    font-family: IRANSans;
    font-weight: bold;
    color: rgb(13, 113, 228);
`