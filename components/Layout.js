import React from "react";
import { Container, Divider } from "semantic-ui-react";
import Head from "next/head";
import Header from "../components/Header";



export default props => {





  return (
    <Container>
      <Head>
      <link
          rel="stylesheet"
          type="text/css"
          href="../static/semantic-ui-css/semantic.min.css"
        />
      
        
        
       
      </Head>
      
    {props.children}
  
    <Divider />
    <Header />
    <Divider />
    </Container>
  
  );
};
