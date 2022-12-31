import styled from "styled-components";

export const Main = styled.div`
  width: 100vw;
  height: 100vh;
  background: #282828;
  color: white;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  & .logo {
    margin-top: 2rem;
    width: 100%;
  }
`;

export const FormContainer = styled.div`
  width: 30%;

  margin-top: 5rem;

  background: #30303a;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.199);
  border-radius: 12px;
  color: #d5d4d6;

  padding: 2rem 4rem;

  & .form-heading {
    font-size: 2rem;
    font-weight: 500;
    letter-spacing: 4px;
    margin-bottom: 2rem;
  }
`;

export const Form = styled.form`
  & .subtitle {
    font-size: 0.8rem;
    display: block;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: rgba(177, 177, 177, 0.3);
  }

  & input {
    border: none;
    border-bottom: solid rgb(143, 143, 143) 1px;

    margin-bottom: 30px;

    background: none;
    color: #8b8e9c;

    height: 35px;
    width: 100%;
    transition: all 0.2s;
  }

  & input:focus {
    border-bottom: solid #494c5d 1px;
  }

  & .form-secondary-cta {
    font-size: 0.7rem;
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;

    & > span {
      cursor: pointer;
      color: #1b87ea;
    }
  }

  & .submit-btn {
    cursor: pointer;

    border: none;
    border-radius: 8px;

    /* box-shadow: 2px 2px 7px #1b87ea; */

    background: #1b87ea;
    color: rgba(255, 255, 255, 0.8);

    width: 100%;

    transition: all 1s;
    margin-top: 1.5rem;
  }

  & .submit-btn:hover {
    color: rgb(255, 255, 255);

    box-shadow: none;
  }
`;
