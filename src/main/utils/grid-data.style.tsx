import styled from "styled-components";
import { DataGrid,  gridClasses } from "@mui/x-data-grid";
 
export const StripedDataGrid = styled(DataGrid)`

& .${gridClasses.row}.even {
  background-color: #fff;
  &:hover, &.Mui-hovered {
    background-color: #d0d0d0;
    @media (hover: none) {
      background-color: transparent;
    }
  }
  &.Mui-selected {
    background-color: #90bce8;
    &:hover, &.Mui-hovered {
      background-color: #90bce8;
      // Reset on touch devices, it doesn't add specificity
      @media (hover: none) {
        background-color: #a5dc86;
      }
    }
  }
}
margin-right: 20px;
`;

export const TitleTotalPage = styled.span`
  color: #000;
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const TitleFilePage = styled.span`
  color: #8A8A8A;
  text-align: right;
  /* Caption */
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 150% */
  letter-spacing: 0.36px;
`;

export const ContainerPagination  = styled.div`
max-width: 100%; /* Establecemos un ancho máximo para adaptarse al contenedor padre */
height: 70px;
flex-shrink: 0;

display: flex;
justify-content: center; /* Centrar horizontalmente */
align-items: center; /* Centrar verticalmente */  
`;

export const ContainerPaginationBorder  = styled.div`
border-top: 1px solid #8A8A8A;
border-bottom: 1px solid #8A8A8A;
margin-right: 20px;
`;

export const ContainerPaginationBorderComponent  = styled.div`
    border-top: 1px solid #8A8A8A;
    border-bottom: 1px solid #8A8A8A;
    width: 100%;
    padding-left: 32px;
    padding-right: 23px;
    height: 56px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;