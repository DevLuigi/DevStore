import styled from "styled-components"

const Container = styled.div`
    display: flex;
    flex-direction: row;
    min-height: 100vh;
    font-family: Montserrat;

    .box {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 60vw;
        padding: 2em 5em 6em 5em;
        background-color: #583BBF;
        color: #fff;
    }
    .titulo {
        font: 700 2.2em Montserrat;
    }
    .login {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 100%;
    }
    .container-form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1em;
        padding-bottom: 5em;
    }
    .form-row {
        display: flex;
        flex-direction: column;
    }
    .title {
        font-size: 3.5em;
        font-weight: bold;
        margin-bottom: .5em !important;
    }
    .form-row > div {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        margin: .2em;
    }
    .label {
        font-weight: 700;
        font-size: 1.2em;
        width: 4em;
    }
`

const ChatButton = styled.button`
    font-weight: 700;
    color: #fff;
    background: #50B4BF;
    border: none;
    border-radius: 20px;
    padding: .5em 1.65em;
    margin: .3em;
    cursor: pointer;
    &:hover {
        background-color: #299ca8;
    }
`

const ChatInput = styled.input`
    border: none;
    background: #FFFFFF;
    border-radius: 5px;
    outline: none;
    padding: .4em .5em;
    cursor: text;
`


export { Container, ChatButton, ChatInput }