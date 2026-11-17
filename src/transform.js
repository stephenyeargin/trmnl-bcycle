function transform(input) {
  const MAX_TO_RETURN = 100;
  const { IDX_0, IDX_1, IDX_2, IDX_3, trmnl } = input;
  const fields = trmnl?.plugin_settings?.custom_fields_values || {};
  const bcycle_station_region = fields.bcycle_station_region;
  const stationIds = (fields.bcycle_station_ids || '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);

  const statusById = Object.fromEntries(
    (IDX_3?.data?.stations || []).map((s) => [s.station_id, s])
  );

  const allStations = IDX_2?.data?.stations || [];
  const infoById = Object.fromEntries(allStations.map((s) => [s.station_id, s]));

  const selected = stationIds.length
    ? stationIds.map((id) => infoById[id]).filter(Boolean)
    : allStations.filter((station) => !bcycle_station_region || station.region_id === bcycle_station_region);

  const stations = selected
    .slice(0, MAX_TO_RETURN)
    .map((station) => {
      const status = statusById[station.station_id] || {};
      return {
        station_id: station.station_id,
        name: station.name,
        address: station.address,
        lat: station.lat,
        lon: station.lon,
        num_bikes_available: status.num_bikes_available,
        num_docks_available: status.num_docks_available,
        is_renting: status.is_renting,
        is_returning: status.is_returning,
        is_installed: status.is_installed,
      };
    });

  return {
    last_updated: IDX_0?.last_updated,
    system_name: IDX_1?.data?.name,
    stations,
  };
}
