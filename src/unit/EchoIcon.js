import React, { useEffect, useRef, useState } from "react";
import Locations from "../../assets/svg/location.svg";
import Slow from "../../assets/svg/slow.svg";
import People from "../../assets/svg/people.svg";

// TODO:狀態表 整合顏色 圖片 (標題、敘述)
// 0~9 zeroStatus
// 10~19 connectStatus
// 20~29 warning
// 30~39 error
function EchoIcon(props) {
    const { img } = props;
    // return <>{props.length > 0 && <Locations />}</>;
    return (
      <>
        {img == 0 && <Locations />}
        {img == 30 && <People />}
        {img == 20 && <Slow />}
      </>
    );
}

export default EchoIcon;