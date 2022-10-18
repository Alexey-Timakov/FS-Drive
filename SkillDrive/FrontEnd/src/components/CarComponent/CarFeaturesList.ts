export interface CarFeaturesListDescription {
  classId: string;
  description: string;
  className: string;
};

export const carFeaturesList: CarFeaturesListDescription[] = [
  {
    classId: "isofix",
    description: "Крепления Isofix",
    className: "icon-car-child-seat"
  },
  {
    classId: "airbags",
    description: "Подушки безопасности",
    className: "icon-car-airbag"
  },
  {
    classId: "authonomyHeater",
    description: "Автономный подогреватель",
    className: "icon-car-authonomy-heater"
  },
  {
    classId: "aux",
    description: "AUX-кабель",
    className: "icon-car-aux"
  },
  {
    classId: "bluetooth",
    description: "Поддержка Bluetooth",
    className: "icon-car-bluetooth"
  },
  {
    classId: "cruiseControl",
    description: "Круиз-контроль",
    className: "icon-car-cruise-control"
  },
  {
    classId: "airConditioner",
    description: "Кондиционер",
    className: "icon-car-air-conditioner"
  },
  {
    classId: "multimedia",
    description: "Мультимедия",
    className: "icon-car-multimedia"
  },
  {
    classId: "navigation",
    description: "Навигация",
    className: "icon-car-navigation"
  },
  {
    classId: "seatVentilation",
    description: "Вентиляция сидений",
    className: "icon-car-seat-ventilation"
  },
  {
    classId: "seatHeat",
    description: "Подогрев сидений",
    className: "icon-car-seat-heater"
  },
  {
    classId: "roofTrunk",
    description: "Багажник на крыше",
    className: "icon-car-roof-trunk"
  },
  {
    classId: "parktronic",
    description: "Парктроники",
    className: "icon-car-parktronic"
  },
  {
    classId: "rearViewCamera",
    description: "Камера заднего вида",
    className: "icon-car-rear-view-camera"
  },
];