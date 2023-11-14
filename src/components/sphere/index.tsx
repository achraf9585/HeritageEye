import React, { Component } from "react";
// @ts-ignore
import ReactPannellum, { getConfig } from "react-pannellum";

class SphereViewer extends Component {
  click() {
    console.log(getConfig());
  }

  render() {
    // const { imageSource } = this.props;
    const config = {
      autoRotate: -6,
      autoLoad: true,
      showZoomCtrl: false,
      showFullscreenCtrl: false,
      hfov: 120,
    };

    const style = {
      width: "100%",
      height: "122%",
      top: "0",
      left: "0",
      position: "absolute",
      zIndex: "-1",
      filter: "blur(1)",
    };
    return (
      <div>
        <ReactPannellum
          id="1"
          sceneId="firstScene"
          imageSource="https://d2vm0afvtrg4mc.cloudfront.net/aarif/1.jpg"
          //imageSource={imageSource}
          config={config}
          style={style}
        />
      </div>
    );
  }
}

export default SphereViewer;
