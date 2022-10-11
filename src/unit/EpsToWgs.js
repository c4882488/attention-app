import gcoord from "gcoord";
/**
 * approx distance between two points on earth ellipsoid
 * POINT(13393551.4639048 2583200.98999826)
 * @param {Object} wtk
 */
export const EspToWsg = (wkt) => {
  let str = wkt;
  str = str.replace(/^(POINT\(+)|(\))/g, "");
  let strAry = str.split(" ");
  // console.log(strAry);

  let result = gcoord.transform(
    [strAry[0], strAry[1]],
    gcoord.EPSG3857,
    gcoord.WGS84
  );
  return result;
};
