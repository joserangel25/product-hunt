import styled from "@emotion/styled";

const Boton = styled.a`
  display: block;
  text-align: center;
  font-weight: 700;
  text-transform: uppercase;
  border: 1px solid #d1d1d1;
  padding: .8rem .8rem;
  /* margin: 2rem auto; */
  background-color: ${props => props.bgColor ? 'var(--naranja)' : 'white'};
  color: ${props => props.bgColor ? 'white' : '#000'};
  background-color: ${props => props.disabled === true ? '#EEE' : ''};
  cursor: ${props => props.disabled === true ? 'not-allowed' : 'pointer'};

  &:last-of-type {
    margin-right: 0;
  }

  &:hover {
    /* cursor: pointer; */
  }

`

export default Boton