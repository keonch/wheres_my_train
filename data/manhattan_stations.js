const manhattanStations = [
   {
      "stop_id": 107,
      "stop_name": "215 St",
      "stop_lat": 40.869444,
      "stop_lon": -73.915279,
      "location_type": 1
   },
   {
      "stop_id": 108,
      "stop_name": "207 St",
      "stop_lat": 40.864621,
      "stop_lon": -73.918822,
      "location_type": 1
   },
   {
      "stop_id": 109,
      "stop_name": "Dyckman St",
      "stop_lat": 40.860531,
      "stop_lon": -73.925536,
      "location_type": 1
   },
   {
      "stop_id": 110,
      "stop_name": "191 St",
      "stop_lat": 40.855225,
      "stop_lon": -73.929412,
      "location_type": 1
   },
   {
      "stop_id": 111,
      "stop_name": "181 St",
      "stop_lat": 40.849505,
      "stop_lon": -73.933596,
      "location_type": 1
   },
   {
      "stop_id": 112,
      "stop_name": "168 St - Washington Hts",
      "stop_lat": 40.840556,
      "stop_lon": -73.940133,
      "location_type": 1
   },
   {
      "stop_id": 113,
      "stop_name": "157 St",
      "stop_lat": 40.834041,
      "stop_lon": -73.94489,
      "location_type": 1
   },
   {
      "stop_id": 114,
      "stop_name": "145 St",
      "stop_lat": 40.826551,
      "stop_lon": -73.95036,
      "location_type": 1
   },
   {
      "stop_id": 115,
      "stop_name": "137 St - City College",
      "stop_lat": 40.822008,
      "stop_lon": -73.953676,
      "location_type": 1
   },
   {
      "stop_id": 116,
      "stop_name": "125 St",
      "stop_lat": 40.815581,
      "stop_lon": -73.958372,
      "location_type": 1
   },
   {
      "stop_id": 117,
      "stop_name": "116 St - Columbia University",
      "stop_lat": 40.807722,
      "stop_lon": -73.96411,
      "location_type": 1
   },
   {
      "stop_id": 118,
      "stop_name": "Cathedral Pkwy",
      "stop_lat": 40.803967,
      "stop_lon": -73.966847,
      "location_type": 1
   },
   {
      "stop_id": 119,
      "stop_name": "103 St",
      "stop_lat": 40.799446,
      "stop_lon": -73.968379,
      "location_type": 1
   },
   {
      "stop_id": 120,
      "stop_name": "96 St",
      "stop_lat": 40.793919,
      "stop_lon": -73.972323,
      "location_type": 1
   },
   {
      "stop_id": 121,
      "stop_name": "86 St",
      "stop_lat": 40.788644,
      "stop_lon": -73.976218,
      "location_type": 1
   },
   {
      "stop_id": 122,
      "stop_name": "79 St",
      "stop_lat": 40.783934,
      "stop_lon": -73.979917,
      "location_type": 1
   },
   {
      "stop_id": 123,
      "stop_name": "72 St",
      "stop_lat": 40.778453,
      "stop_lon": -73.98197,
      "location_type": 1
   },
   {
      "stop_id": 124,
      "stop_name": "66 St - Lincoln Center",
      "stop_lat": 40.77344,
      "stop_lon": -73.982209,
      "location_type": 1
   },
   {
      "stop_id": 125,
      "stop_name": "59 St - Columbus Circle",
      "stop_lat": 40.768247,
      "stop_lon": -73.981929,
      "location_type": 1
   },
   {
      "stop_id": 126,
      "stop_name": "50 St",
      "stop_lat": 40.761728,
      "stop_lon": -73.983849,
      "location_type": 1
   },
   {
      "stop_id": 127,
      "stop_name": "Times Sq - 42 St",
      "stop_lat": 40.75529,
      "stop_lon": -73.987495,
      "location_type": 1
   },
   {
      "stop_id": 128,
      "stop_name": "34 St - Penn Station",
      "stop_lat": 40.750373,
      "stop_lon": -73.991057,
      "location_type": 1
   },
   {
      "stop_id": 129,
      "stop_name": "28 St",
      "stop_lat": 40.747215,
      "stop_lon": -73.993365,
      "location_type": 1
   },
   {
      "stop_id": 130,
      "stop_name": "23 St",
      "stop_lat": 40.744081,
      "stop_lon": -73.995657,
      "location_type": 1
   },
   {
      "stop_id": 131,
      "stop_name": "18 St",
      "stop_lat": 40.74104,
      "stop_lon": -73.997871,
      "location_type": 1
   },
   {
      "stop_id": 132,
      "stop_name": "14 St",
      "stop_lat": 40.737826,
      "stop_lon": -74.000201,
      "location_type": 1
   },
   {
      "stop_id": 133,
      "stop_name": "Christopher St - Sheridan Sq",
      "stop_lat": 40.733422,
      "stop_lon": -74.002906,
      "location_type": 1
   },
   {
      "stop_id": 134,
      "stop_name": "Houston St",
      "stop_lat": 40.728251,
      "stop_lon": -74.005367,
      "location_type": 1
   },
   {
      "stop_id": 135,
      "stop_name": "Canal St",
      "stop_lat": 40.722854,
      "stop_lon": -74.006277,
      "location_type": 1
   },
   {
      "stop_id": 136,
      "stop_name": "Franklin St",
      "stop_lat": 40.719318,
      "stop_lon": -74.006886,
      "location_type": 1
   },
   {
      "stop_id": 137,
      "stop_name": "Chambers St",
      "stop_lat": 40.715478,
      "stop_lon": -74.009266,
      "location_type": 1
   },
   {
      "stop_id": 138,
      "stop_name": "Cortlandt St",
      "stop_lat": 40.711835,
      "stop_lon": -74.012188,
      "location_type": 1
   },
   {
      "stop_id": 139,
      "stop_name": "Rector St",
      "stop_lat": 40.707513,
      "stop_lon": -74.013783,
      "location_type": 1
   },
   {
      "stop_id": 140,
      "stop_name": "South Ferry Loop",
      "stop_lat": 40.701411,
      "stop_lon": -74.013205,
      "location_type": 1
   },
   {
      "stop_id": 142,
      "stop_name": "South Ferry",
      "stop_lat": 40.702068,
      "stop_lon": -74.013664,
      "location_type": 1
   },
   {
      "stop_id": 224,
      "stop_name": "135 St",
      "stop_lat": 40.814229,
      "stop_lon": -73.94077,
      "location_type": 1
   },
   {
      "stop_id": 225,
      "stop_name": "125 St",
      "stop_lat": 40.807754,
      "stop_lon": -73.945495,
      "location_type": 1
   },
   {
      "stop_id": 226,
      "stop_name": "116 St",
      "stop_lat": 40.802098,
      "stop_lon": -73.949625,
      "location_type": 1
   },
   {
      "stop_id": 227,
      "stop_name": "Central Park North (110 St)",
      "stop_lat": 40.799075,
      "stop_lon": -73.951822,
      "location_type": 1
   },
   {
      "stop_id": 228,
      "stop_name": "Park Pl",
      "stop_lat": 40.713051,
      "stop_lon": -74.008811,
      "location_type": 1
   },
   {
      "stop_id": 229,
      "stop_name": "Fulton St",
      "stop_lat": 40.709416,
      "stop_lon": -74.006571,
      "location_type": 1
   },
   {
      "stop_id": 230,
      "stop_name": "Wall St",
      "stop_lat": 40.706821,
      "stop_lon": -74.0091,
      "location_type": 1
   },
   {
      "stop_id": 301,
      "stop_name": "Harlem - 148 St",
      "stop_lat": 40.82388,
      "stop_lon": -73.93647,
      "location_type": 1
   },
   {
      "stop_id": 302,
      "stop_name": "145 St",
      "stop_lat": 40.820421,
      "stop_lon": -73.936245,
      "location_type": 1
   },
   {
      "stop_id": 418,
      "stop_name": "Fulton St",
      "stop_lat": 40.710368,
      "stop_lon": -74.009509,
      "location_type": 1
   },
   {
      "stop_id": 419,
      "stop_name": "Wall St",
      "stop_lat": 40.707557,
      "stop_lon": -74.011862,
      "location_type": 1
   },
   {
      "stop_id": 420,
      "stop_name": "Bowling Green",
      "stop_lat": 40.704817,
      "stop_lon": -74.014065,
      "location_type": 1
   },
   {
      "stop_id": 621,
      "stop_name": "125 St",
      "stop_lat": 40.804138,
      "stop_lon": -73.937594,
      "location_type": 1
   },
   {
      "stop_id": 622,
      "stop_name": "116 St",
      "stop_lat": 40.798629,
      "stop_lon": -73.941617,
      "location_type": 1
   },
   {
      "stop_id": 623,
      "stop_name": "110 St",
      "stop_lat": 40.79502,
      "stop_lon": -73.94425,
      "location_type": 1
   },
   {
      "stop_id": 624,
      "stop_name": "103 St",
      "stop_lat": 40.7906,
      "stop_lon": -73.947478,
      "location_type": 1
   },
   {
      "stop_id": 625,
      "stop_name": "96 St",
      "stop_lat": 40.785672,
      "stop_lon": -73.95107,
      "location_type": 1
   },
   {
      "stop_id": 626,
      "stop_name": "86 St",
      "stop_lat": 40.779492,
      "stop_lon": -73.955589,
      "location_type": 1
   },
   {
      "stop_id": 627,
      "stop_name": "77 St",
      "stop_lat": 40.77362,
      "stop_lon": -73.959874,
      "location_type": 1
   },
   {
      "stop_id": 628,
      "stop_name": "68 St - Hunter College",
      "stop_lat": 40.768141,
      "stop_lon": -73.96387,
      "location_type": 1
   },
   {
      "stop_id": 629,
      "stop_name": "59 St",
      "stop_lat": 40.762526,
      "stop_lon": -73.967967,
      "location_type": 1
   },
   {
      "stop_id": 630,
      "stop_name": "51 St",
      "stop_lat": 40.757107,
      "stop_lon": -73.97192,
      "location_type": 1
   },
   {
      "stop_id": 631,
      "stop_name": "Grand Central - 42 St",
      "stop_lat": 40.751776,
      "stop_lon": -73.976848,
      "location_type": 1
   },
   {
      "stop_id": 632,
      "stop_name": "33 St",
      "stop_lat": 40.746081,
      "stop_lon": -73.982076,
      "location_type": 1
   },
   {
      "stop_id": 633,
      "stop_name": "28 St",
      "stop_lat": 40.74307,
      "stop_lon": -73.984264,
      "location_type": 1
   },
   {
      "stop_id": 634,
      "stop_name": "23 St",
      "stop_lat": 40.739864,
      "stop_lon": -73.986599,
      "location_type": 1
   },
   {
      "stop_id": 635,
      "stop_name": "14 St - Union Sq",
      "stop_lat": 40.734673,
      "stop_lon": -73.989951,
      "location_type": 1
   },
   {
      "stop_id": 636,
      "stop_name": "Astor Pl",
      "stop_lat": 40.730054,
      "stop_lon": -73.99107,
      "location_type": 1
   },
   {
      "stop_id": 637,
      "stop_name": "Bleecker St",
      "stop_lat": 40.725915,
      "stop_lon": -73.994659,
      "location_type": 1
   },
   {
      "stop_id": 638,
      "stop_name": "Spring St",
      "stop_lat": 40.722301,
      "stop_lon": -73.997141,
      "location_type": 1
   },
   {
      "stop_id": 639,
      "stop_name": "Canal St",
      "stop_lat": 40.718803,
      "stop_lon": -74.000193,
      "location_type": 1
   },
   {
      "stop_id": 640,
      "stop_name": "Brooklyn Bridge - City Hall",
      "stop_lat": 40.713065,
      "stop_lon": -74.004131,
      "location_type": 1
   },
   {
      "stop_id": 723,
      "stop_name": "Grand Central - 42 St",
      "stop_lat": 40.751431,
      "stop_lon": -73.976041,
      "location_type": 1
   },
   {
      "stop_id": 724,
      "stop_name": "5 Av",
      "stop_lat": 40.753821,
      "stop_lon": -73.981963,
      "location_type": 1
   },
   {
      "stop_id": 725,
      "stop_name": "Times Sq - 42 St",
      "stop_lat": 40.755477,
      "stop_lon": -73.987691,
      "location_type": 1
   },
   {
      "stop_id": 726,
      "stop_name": "34 St - 11 Av",
      "stop_lat": 40.755882,
      "stop_lon": -74.00191,
      "location_type": 1
   },
   {
      "stop_id": 901,
      "stop_name": "Grand Central - 42 St",
      "stop_lat": 40.752769,
      "stop_lon": -73.979189,
      "location_type": 1
   },
   {
      "stop_id": 902,
      "stop_name": "Times Sq - 42 St",
      "stop_lat": 40.755983,
      "stop_lon": -73.986229,
      "location_type": 1
   },
   {
      "stop_id": "A02",
      "stop_name": "Inwood - 207 St",
      "stop_lat": 40.868072,
      "stop_lon": -73.919899,
      "location_type": 1
   },
   {
      "stop_id": "A03",
      "stop_name": "Dyckman St",
      "stop_lat": 40.865491,
      "stop_lon": -73.927271,
      "location_type": 1
   },
   {
      "stop_id": "A05",
      "stop_name": "190 St",
      "stop_lat": 40.859022,
      "stop_lon": -73.93418,
      "location_type": 1
   },
   {
      "stop_id": "A06",
      "stop_name": "181 St",
      "stop_lat": 40.851695,
      "stop_lon": -73.937969,
      "location_type": 1
   },
   {
      "stop_id": "A07",
      "stop_name": "175 St",
      "stop_lat": 40.847391,
      "stop_lon": -73.939704,
      "location_type": 1
   },
   {
      "stop_id": "A09",
      "stop_name": "168 St",
      "stop_lat": 40.840719,
      "stop_lon": -73.939561,
      "location_type": 1
   },
   {
      "stop_id": "A10",
      "stop_name": "163 St - Amsterdam Av",
      "stop_lat": 40.836013,
      "stop_lon": -73.939892,
      "location_type": 1
   },
   {
      "stop_id": "A11",
      "stop_name": "155 St",
      "stop_lat": 40.830518,
      "stop_lon": -73.941514,
      "location_type": 1
   },
   {
      "stop_id": "A12",
      "stop_name": "145 St",
      "stop_lat": 40.824783,
      "stop_lon": -73.944216,
      "location_type": 1
   },
   {
      "stop_id": "A14",
      "stop_name": "135 St",
      "stop_lat": 40.817894,
      "stop_lon": -73.947649,
      "location_type": 1
   },
   {
      "stop_id": "A15",
      "stop_name": "125 St",
      "stop_lat": 40.811109,
      "stop_lon": -73.952343,
      "location_type": 1
   },
   {
      "stop_id": "A16",
      "stop_name": "116 St",
      "stop_lat": 40.805085,
      "stop_lon": -73.954882,
      "location_type": 1
   },
   {
      "stop_id": "A17",
      "stop_name": "Cathedral Pkwy (110 St)",
      "stop_lat": 40.800603,
      "stop_lon": -73.958161,
      "location_type": 1
   },
   {
      "stop_id": "A18",
      "stop_name": "103 St",
      "stop_lat": 40.796092,
      "stop_lon": -73.961454,
      "location_type": 1
   },
   {
      "stop_id": "A19",
      "stop_name": "96 St",
      "stop_lat": 40.791642,
      "stop_lon": -73.964696,
      "location_type": 1
   },
   {
      "stop_id": "A20",
      "stop_name": "86 St",
      "stop_lat": 40.785868,
      "stop_lon": -73.968916,
      "location_type": 1
   },
   {
      "stop_id": "A21",
      "stop_name": "81 St - Museum of Natural History",
      "stop_lat": 40.781433,
      "stop_lon": -73.972143,
      "location_type": 1
   },
   {
      "stop_id": "A22",
      "stop_name": "72 St",
      "stop_lat": 40.775594,
      "stop_lon": -73.97641,
      "location_type": 1
   },
   {
      "stop_id": "A24",
      "stop_name": "59 St - Columbus Circle",
      "stop_lat": 40.768296,
      "stop_lon": -73.981736,
      "location_type": 1
   },
   {
      "stop_id": "A25",
      "stop_name": "50 St",
      "stop_lat": 40.762456,
      "stop_lon": -73.985984,
      "location_type": 1
   },
   {
      "stop_id": "A27",
      "stop_name": "42 St - Port Authority Bus Terminal",
      "stop_lat": 40.757308,
      "stop_lon": -73.989735,
      "location_type": 1
   },
   {
      "stop_id": "A28",
      "stop_name": "34 St - Penn Station",
      "stop_lat": 40.752287,
      "stop_lon": -73.993391,
      "location_type": 1
   },
   {
      "stop_id": "A30",
      "stop_name": "23 St",
      "stop_lat": 40.745906,
      "stop_lon": -73.998041,
      "location_type": 1
   },
   {
      "stop_id": "A31",
      "stop_name": "14 St",
      "stop_lat": 40.740893,
      "stop_lon": -74.00169,
      "location_type": 1
   },
   {
      "stop_id": "A32",
      "stop_name": "W 4 St",
      "stop_lat": 40.732338,
      "stop_lon": -74.000495,
      "location_type": 1
   },
   {
      "stop_id": "A33",
      "stop_name": "Spring St",
      "stop_lat": 40.726227,
      "stop_lon": -74.003739,
      "location_type": 1
   },
   {
      "stop_id": "A34",
      "stop_name": "Canal St",
      "stop_lat": 40.720824,
      "stop_lon": -74.005229,
      "location_type": 1
   },
   {
      "stop_id": "A36",
      "stop_name": "Chambers St",
      "stop_lat": 40.714111,
      "stop_lon": -74.008585,
      "location_type": 1
   },
   {
      "stop_id": "A38",
      "stop_name": "Fulton St",
      "stop_lat": 40.710197,
      "stop_lon": -74.007691,
      "location_type": 1
   },
   {
      "stop_id": "B06",
      "stop_name": "Roosevelt Island",
      "stop_lat": 40.759145,
      "stop_lon": -73.95326,
      "location_type": 1
   },
   {
      "stop_id": "B08",
      "stop_name": "Lexington Av/63 St",
      "stop_lat": 40.764629,
      "stop_lon": -73.966113,
      "location_type": 1
   },
   {
      "stop_id": "B10",
      "stop_name": "57 St",
      "stop_lat": 40.763972,
      "stop_lon": -73.97745,
      "location_type": 1
   },
   {
      "stop_id": "D12",
      "stop_name": "155 St",
      "stop_lat": 40.830135,
      "stop_lon": -73.938209,
      "location_type": 1
   },
   {
      "stop_id": "D13",
      "stop_name": "145 St",
      "stop_lat": 40.824783,
      "stop_lon": -73.944216,
      "location_type": 1
   },
   {
      "stop_id": "D14",
      "stop_name": "7 Av",
      "stop_lat": 40.762862,
      "stop_lon": -73.981637,
      "location_type": 1
   },
   {
      "stop_id": "D15",
      "stop_name": "47-50 Sts - Rockefeller Ctr",
      "stop_lat": 40.758663,
      "stop_lon": -73.981329,
      "location_type": 1
   },
   {
      "stop_id": "D16",
      "stop_name": "42 St - Bryant Pk",
      "stop_lat": 40.754222,
      "stop_lon": -73.984569,
      "location_type": 1
   },
   {
      "stop_id": "D17",
      "stop_name": "34 St - Herald Sq",
      "stop_lat": 40.749719,
      "stop_lon": -73.987823,
      "location_type": 1
   },
   {
      "stop_id": "D18",
      "stop_name": "23 St",
      "stop_lat": 40.742878,
      "stop_lon": -73.992821,
      "location_type": 1
   },
   {
      "stop_id": "D19",
      "stop_name": "14 St",
      "stop_lat": 40.738228,
      "stop_lon": -73.996209,
      "location_type": 1
   },
   {
      "stop_id": "D20",
      "stop_name": "W 4 St",
      "stop_lat": 40.732338,
      "stop_lon": -74.000495,
      "location_type": 1
   },
   {
      "stop_id": "D21",
      "stop_name": "Broadway-Lafayette St",
      "stop_lat": 40.725297,
      "stop_lon": -73.996204,
      "location_type": 1
   },
   {
      "stop_id": "D22",
      "stop_name": "Grand St",
      "stop_lat": 40.718267,
      "stop_lon": -73.993753,
      "location_type": 1
   },
   {
      "stop_id": "E01",
      "stop_name": "World Trade Center",
      "stop_lat": 40.712582,
      "stop_lon": -74.009781,
      "location_type": 1
   },
   {
      "stop_id": "F11",
      "stop_name": "Lexington Av/53 St",
      "stop_lat": 40.757552,
      "stop_lon": -73.969055,
      "location_type": 1
   },
   {
      "stop_id": "F12",
      "stop_name": "5 Av/53 St",
      "stop_lat": 40.760167,
      "stop_lon": -73.975224,
      "location_type": 1
   },
   {
      "stop_id": "F14",
      "stop_name": "2 Av",
      "stop_lat": 40.723402,
      "stop_lon": -73.989938,
      "location_type": 1
   },
   {
      "stop_id": "F15",
      "stop_name": "Delancey St",
      "stop_lat": 40.718611,
      "stop_lon": -73.988114,
      "location_type": 1
   },
   {
      "stop_id": "F16",
      "stop_name": "East Broadway",
      "stop_lat": 40.713715,
      "stop_lon": -73.990173,
      "location_type": 1
   },
   {
      "stop_id": "F18",
      "stop_name": "York St",
      "stop_lat": 40.701397,
      "stop_lon": -73.986751,
      "location_type": 1
   },
   {
      "stop_id": "L01",
      "stop_name": "8 Av",
      "stop_lat": 40.739777,
      "stop_lon": -74.002578,
      "location_type": 1
   },
   {
      "stop_id": "L02",
      "stop_name": "6 Av",
      "stop_lat": 40.737335,
      "stop_lon": -73.996786,
      "location_type": 1
   },
   {
      "stop_id": "L03",
      "stop_name": "Union Sq - 14 St",
      "stop_lat": 40.734789,
      "stop_lon": -73.99073,
      "location_type": 1
   },
   {
      "stop_id": "L05",
      "stop_name": "3 Av",
      "stop_lat": 40.732849,
      "stop_lon": -73.986122,
      "location_type": 1
   },
   {
      "stop_id": "L06",
      "stop_name": "1 Av",
      "stop_lat": 40.730953,
      "stop_lon": -73.981628,
      "location_type": 1
   },
   {
      "stop_id": "L08",
      "stop_name": "Bedford Av",
      "stop_lat": 40.717304,
      "stop_lon": -73.956872,
      "location_type": 1
   },
   {
      "stop_id": "M16",
      "stop_name": "Marcy Av",
      "stop_lat": 40.708359,
      "stop_lon": -73.957757,
      "location_type": 1
   },
   {
      "stop_id": "M18",
      "stop_name": "Essex St",
      "stop_lat": 40.718315,
      "stop_lon": -73.987437,
      "location_type": 1
   },
   {
      "stop_id": "M19",
      "stop_name": "Bowery",
      "stop_lat": 40.72028,
      "stop_lon": -73.993915,
      "location_type": 1
   },
   {
      "stop_id": "M20",
      "stop_name": "Canal St",
      "stop_lat": 40.718092,
      "stop_lon": -73.999892,
      "location_type": 1
   },
   {
      "stop_id": "M21",
      "stop_name": "Chambers St",
      "stop_lat": 40.713243,
      "stop_lon": -74.003401,
      "location_type": 1
   },
   {
      "stop_id": "M22",
      "stop_name": "Fulton St",
      "stop_lat": 40.710374,
      "stop_lon": -74.007582,
      "location_type": 1
   },
   {
      "stop_id": "M23",
      "stop_name": "Broad St",
      "stop_lat": 40.706476,
      "stop_lon": -74.011056,
      "location_type": 1
   },
   {
      "stop_id": "Q01",
      "stop_name": "Canal St",
      "stop_lat": 40.718383,
      "stop_lon": -74.00046,
      "location_type": 1
   },
   {
      "stop_id": "Q03",
      "stop_name": "72 St",
      "stop_lat": 40.768799,
      "stop_lon": -73.958424,
      "location_type": 1
   },
   {
      "stop_id": "Q04",
      "stop_name": "86 St",
      "stop_lat": 40.777891,
      "stop_lon": -73.951787,
      "location_type": 1
   },
   {
      "stop_id": "Q05",
      "stop_name": "96 St",
      "stop_lat": 40.784318,
      "stop_lon": -73.947152,
      "location_type": 1
   },
   {
      "stop_id": "R09",
      "stop_name": "Queensboro Plaza",
      "stop_lat": 40.750582,
      "stop_lon": -73.940202,
      "location_type": 1
   },
   {
      "stop_id": "R11",
      "stop_name": "Lexington Av/59 St",
      "stop_lat": 40.76266,
      "stop_lon": -73.967258,
      "location_type": 1
   },
   {
      "stop_id": "R13",
      "stop_name": "5 Av/59 St",
      "stop_lat": 40.764811,
      "stop_lon": -73.973347,
      "location_type": 1
   },
   {
      "stop_id": "R14",
      "stop_name": "57 St - 7 Av",
      "stop_lat": 40.764664,
      "stop_lon": -73.980658,
      "location_type": 1
   },
   {
      "stop_id": "R15",
      "stop_name": "49 St",
      "stop_lat": 40.759901,
      "stop_lon": -73.984139,
      "location_type": 1
   },
   {
      "stop_id": "R16",
      "stop_name": "Times Sq - 42 St",
      "stop_lat": 40.754672,
      "stop_lon": -73.986754,
      "location_type": 1
   },
   {
      "stop_id": "R17",
      "stop_name": "34 St - Herald Sq",
      "stop_lat": 40.749567,
      "stop_lon": -73.98795,
      "location_type": 1
   },
   {
      "stop_id": "R18",
      "stop_name": "28 St",
      "stop_lat": 40.745494,
      "stop_lon": -73.988691,
      "location_type": 1
   },
   {
      "stop_id": "R19",
      "stop_name": "23 St",
      "stop_lat": 40.741303,
      "stop_lon": -73.989344,
      "location_type": 1
   },
   {
      "stop_id": "R20",
      "stop_name": "14 St - Union Sq",
      "stop_lat": 40.735736,
      "stop_lon": -73.990568,
      "location_type": 1
   },
   {
      "stop_id": "R21",
      "stop_name": "8 St - NYU",
      "stop_lat": 40.730328,
      "stop_lon": -73.992629,
      "location_type": 1
   },
   {
      "stop_id": "R22",
      "stop_name": "Prince St",
      "stop_lat": 40.724329,
      "stop_lon": -73.997702,
      "location_type": 1
   },
   {
      "stop_id": "R23",
      "stop_name": "Canal St",
      "stop_lat": 40.719527,
      "stop_lon": -74.001775,
      "location_type": 1
   },
   {
      "stop_id": "R24",
      "stop_name": "City Hall",
      "stop_lat": 40.713282,
      "stop_lon": -74.006978,
      "location_type": 1
   },
   {
      "stop_id": "R25",
      "stop_name": "Cortlandt St",
      "stop_lat": 40.710668,
      "stop_lon": -74.011029,
      "location_type": 1
   },
   {
      "stop_id": "R26",
      "stop_name": "Rector St",
      "stop_lat": 40.70722,
      "stop_lon": -74.013342,
      "location_type": 1
   },
   {
      "stop_id": "R27",
      "stop_name": "Whitehall St",
      "stop_lat": 40.703087,
      "stop_lon": -74.012994,
      "location_type": 1
   },
   {
      "stop_id": "R28",
      "stop_name": "Court St",
      "stop_lat": 40.6941,
      "stop_lon": -73.991777,
      "location_type": 1
   },
]

export default manhattanStations;
