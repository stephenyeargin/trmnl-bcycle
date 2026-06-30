function transform(input) {
  const MAX_TO_RETURN = 100;
  const { IDX_0, IDX_1, IDX_2, IDX_3, trmnl } = input;
  const bcycle_station_region = trmnl?.plugin_settings?.custom_fields_values?.bcycle_station_region;

  const statusById = Object.fromEntries(
    (IDX_3?.data?.stations || []).map((s) => [s.station_id, s])
  );

  const stations = (IDX_2?.data?.stations || [])
    .filter((station) => !bcycle_station_region || station.region_id === bcycle_station_region)
    .slice(0, MAX_TO_RETURN)
    .map((station) => {
      const status = statusById[station.station_id] || {};
      return {
        station_id: station.station_id,
        name: station.name,
        address: station.address,
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
