import React from "react";
import App from "next/app";

import "reflect-metadata";
import "../css/antd.less";

/**
 * Main entry of application.
 */
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return <Component {...pageProps} />;
  }
}

export default MyApp;
