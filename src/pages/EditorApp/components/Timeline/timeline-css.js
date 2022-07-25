import styled from "styled-components";

export const Main = styled.div`
  padding: 20px 20px 0 25px;
  width: 19vw;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  margin: 40px 0 30px;
  width: 92%;
  & > h2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #c7c7c7;

    & .icon {
      cursor: pointer;
      fill: #acb0b8;
      transition: all 0.5s ease-in;
    }

    & .refresh {
      transform: rotateZ(360deg);
    }
  }

  & > span {
    color: #777a7e;
    font-size: 12px;
  }
`;

export const SearchField = styled.div`
  width: 92%;
  height: 60px;
  background: #1e2022;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  border-radius: 5px;
  cursor: text;
  overflow: hidden;
  & > .search {
    background: transparent;
    width: 100%;
    border-style: none;
    outline: none;
    &::placeholder {
      color: #777a7e;
    }
  }
  & > .active {
    width: auto;
    color: white;
  }
  & > .svg {
    fill: #777a7e;
    transition: all 0.5s;
  }
  & > .hidden {
    transform: translateX(100px);
  }
`;

export const NewFile = styled.div`
  margin-top: 4px;
  font-size: 14px;
  color: #777a7e;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
  width: 92%;
  background: #1e2022;
  padding: 2px;
  border-radius: 6px;

  & > svg {
    margin-left: 4px;
    fill: #777a7e;
  }
`;

export const Files = styled.div`
  margin-top: 20px;
  overflow-y: auto;
  height: 100%;
  position: relative;
  scrollbar-color: #1d1f21 #222324;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 8px;
    left: -100px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px #222324;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #1d1f21;
    border-radius: 10px;
    outline: none;
  }

  & .file {
    width: 95%;
    height: auto;
    background: #222324;
    border-radius: 10px;
    padding: 12px 15px;
    color: white;
    margin-bottom: 15px;
    cursor: default;
    overflow: hidden;

    & > .desc {
      font-size: 11px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    & > .published {
      font-size: 11px;
      margin-bottom: 5px;
    }

    & > .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      & .heading {
        font-weight: bold;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        flex: 1;
        margin-right: 10px;
      }
      & .action {
        background: #ffffff40;
        padding: 2px;
        display: grid;
        place-items: center;
        border-radius: 2px;
      }
    }
  }

  & .active {
    background: #4444ff;
  }
`;
