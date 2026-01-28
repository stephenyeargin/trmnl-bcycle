function transform(input) {
  const { IDX_0, IDX_1, IDX_2, IDX_3 } = input;

  return {
    IDX_0,
    IDX_1: {
      data: {
        name: IDX_1?.data?.name,
      },
    },
    IDX_2: {
      data: {
        stations: IDX_2?.data?.stations?.map((station) => ({
          station_id: station.station_id,
          name: station.name,
          address: station.address,
          region_id: station.region_id,
        })) || [],
      },
    },
    IDX_3: {
      last_updated: IDX_3?.last_updated,
      data: {
        stations: IDX_3?.data?.stations?.map((station) => ({
          station_id: station.station_id,
          num_bikes_available: station.num_bikes_available,
          num_docks_available: station.num_docks_available,
          is_renting: station.is_renting,
          is_returning: station.is_returning,
          is_installed: station.is_installed,
        })) || [],
      },
    },
  };
}
