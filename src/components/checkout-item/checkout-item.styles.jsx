import styled, { css } from 'styled-components';

const spanWidthStyles = css`
    width: 23%;
`;

export const CheckoutItemStyled = styled.div`
    width: 100%;
    display: flex;
    min-height: 100px;
    border-bottom: 1px solid darkgrey;
    padding: 15px 0;
    font-size: 20px;
    align-items: center;
`;

export const ImageContainerStyled = styled.div`
    width: 23%;
    padding-right: 15px;
`;

export const ImgStyled = styled.img`
    width: 100%;
    height: 100%;
`;

export const NameStyled = styled.span`
    ${spanWidthStyles}
`;

export const QuantityStyled = styled.span`
    ${spanWidthStyles}
    display: flex;
`;

export const PriceStyled = styled.span`
    ${spanWidthStyles}
`;

export const ArrowStyled = styled.div`
    cursor: pointer;
`;

export const ValueStyled = styled.span`
    margin: 0 10px;
`;

export const RemoveButtonStyled = styled.div`
    padding-left: 12px;
    cursor: pointer;
`;
