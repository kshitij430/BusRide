const getTimeDistance = async function (doc) {
  const source = await fetch(
    `${process.env.BING_URL}/Locations?countryRegion=india&locality=${doc.busDepartureCity}&key=${process.env.BING_KEY}`
  );
  const dest = await fetch(
    `${process.env.BING_URL}/Locations?countryRegion=india&locality=${doc.busArrivalCity}&key=${process.env.BING_KEY}`
  );
  const sourceCoords = (await source.json()).resourceSets[0].resources[0].point.coordinates;
  const destCoords = (await dest.json()).resourceSets[0].resources[0].point.coordinates;
  const timeDistanceRes = await fetch(
    `${process.env.BING_URL}/Routes/DistanceMatrix?origins=${sourceCoords}&destinations=${destCoords}&travelMode=driving&timeUnit=&key=${process.env.BING_KEY}`
  );
  const { travelDistance, travelDuration } = (await timeDistanceRes.json()).resourceSets[0].resources[0].results[0];
  //   travelDistance in km and travelDuration in minutes.
  return { travelDistance, travelDuration: Math.round(travelDuration / 60) };
};

exports.saveTimeDistance = async function (doc) {
  let tomorrow = new Date();
  const timeDistance = await getTimeDistance(doc);
  doc.busTravelDistance = timeDistance.travelDistance;
  doc.busTravelDuration = timeDistance.travelDuration;
  // NOTE::I have rounded bus duration time, algorithm can also be implemented otherwise for more accurate time
  let arrivalTime = Number(doc.busDepartureTime.split(":")[0]);
  // 24 hour clock convert, if time exceeds 24
  for (let i = 1; i <= Math.round(doc.busTravelDuration); i++) {
    if (arrivalTime == 24) {
      tomorrow.setDate(new Date().getDate() + 1);
      arrivalTime = 0;
    }
    arrivalTime += 1;
  }
  doc.busArrivalTime = `${arrivalTime}:${Number(doc.busDepartureTime.split(":")[1])}`;
  doc.busArrivalDate = tomorrow;
};
