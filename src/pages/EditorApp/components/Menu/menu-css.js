import styled from "styled-components";

export const Main = styled.div`
  padding: 20px 20px;
  width: 11vw;
  max-height: 100vh;
  border-top-right-radius: 10px;
  background: white;
  display: flex;
  flex-direction: column;
  & > h2 {
    margin: 30px 0;
  }
`;

export const Links = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  scrollbar-color: #1d1f2163 #2223242d;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px #2223242d;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #1d1f2163;
    border-radius: 10px;
    outline: none;
  }

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 25px;
    color: #acb0b8;
    & .list {
      font-size: 14px;
      cursor: default;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 95%;
      &:hover {
        color: #1e2022;
      }
    }
    &:first-child {
      margin: 0;
    }

    & .action {
      &:hover {
        color: #1e2022;
      }
    }

    & > .active {
      color: #4444ff;
      cursor: default;

      &:hover {
        color: #4444ff;
      }
    }
  }
`;

export const HLine = styled.div`
  margin: 10px 0;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border-top: 3px solid #e6e7ea;
    border-radius: 20px;
  }
`;

export const ActionItem = styled.div`
  font-size: 14px;
  color: #acb0b8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  cursor: pointer;
  &:hover {
    color: #1e2022;
  }
`;
