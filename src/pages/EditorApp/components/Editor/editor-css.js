import styled from "styled-components";

export const Main = styled.div`
  background: #1a1a1a;
  width: 70vw;
  height: 100vh;
  border-top-left-radius: 10px;
  color: white;
  display: flex;
  flex-direction: column;

  & .editor {
    flex: 1;
    border-top: 1px solid #dddddd;
    overflow-y: auto;
    display: flex;
    overflow-x: hidden;
    word-wrap: break-word;
  }
`;

export const SearchField = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-radius: 5px;
  cursor: text;
  overflow: hidden;
  & > .search {
    background: transparent;
    width: 100%;
    border-style: none;
    outline: none;
    color: #f0f0f0;
    font-size: 1rem;
    &::placeholder {
      color: #777a7e;
      font-weight: 500;
      font-size: 1rem;
    }
  }
  & > .active {
    color: white;
  }
  & > svg {
    fill: #777a7e;
    margin-right: 8px;
  }
`;

export const Seperator = styled.div`
  width: 100%;
  height: 4px;
  background: black;
`;

export const Toolbar = styled.div`
  display: flex;
  padding: 20px 20px;

  & .tools {
    display: flex;
    /* align-items: center; */
    &:not(&:first-child) {
      padding: 0px 10px;
      border-left: 1px solid #777a7e;
    }
    & .toolbar-icon {
      margin-right: 20px;
      color: #777a7e;
      font-size: 1.4rem;
      &:hover {
        color: white;
        cursor: pointer;
      }
    }
  }
`;

export const NoteHead = styled.div`
  padding: 0 20px;
  & .noteHead {
    margin-bottom: 10px;
    display: block;
    width: 100%;
    background: transparent;
    outline: none;
    border: none;
    &::placeholder {
      color: #777a7e;
    }
  }
  & .heading {
    font-size: 2rem;
    font-weight: 600;
    color: #777a7e;
  }

  & .desc {
    font-weight: 400;
    color: #777a7e;
  }
`;
