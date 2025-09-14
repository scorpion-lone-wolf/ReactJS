import styled, { css } from "styled-components";

const Row = styled.div.attrs(props => {
  props.type = props.type || "vertical";
})`
  display: flex;

  ${({ type }) =>
    type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${({ type }) =>
    type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

export default Row;
