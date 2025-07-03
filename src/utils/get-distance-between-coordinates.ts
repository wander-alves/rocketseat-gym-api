interface Coordinate {
  latitude: number;
  longitude: number;
}
export function getDistanceBetweenCoordinates(
  from: Coordinate,
  to: Coordinate,
) {
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0;
  }
  const fromRadian = degreesToRadian(from.latitude);
  const toRadian = degreesToRadian(to.latitude);

  const theta = from.latitude - to.latitude;
  const thetaRadian = degreesToRadian(theta);

  let distance = haversine(fromRadian, toRadian, thetaRadian);

  if (distance > 1) {
    distance = 1;
  }

  const distanceAcos = Math.acos(distance);
  const distanceInDegrees = radianToDegrees(distanceAcos);
  const nauticMile = 1.1515;
  const distanceInNauticMiles = distanceInDegrees * 60 * nauticMile;
  const oneKilometerInMiles = 1.60934;
  distance = distanceInNauticMiles * oneKilometerInMiles;

  return distance;
}

function degreesToRadian(value: number) {
  const circleRadian = 180; // 360 / 2 = 180
  const radian = (value * Math.PI) / circleRadian;
  return radian;
}

function radianToDegrees(value: number) {
  const circleRadian = 180; // 360 / 2 = 180
  const radian = (value * circleRadian) / Math.PI;
  return radian;
}

function haversine(
  fromRadian: number,
  toRadian: number,
  thetaRadian: number,
): number {
  const distanceSin = Math.sin(fromRadian) * Math.sin(toRadian);
  const distanceCos = Math.cos(fromRadian) * Math.cos(toRadian);
  const thetaCos = Math.cos(thetaRadian);

  const result = distanceSin + distanceCos * thetaCos;

  return result;
}
