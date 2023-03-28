export const CATEGORIES = [
  {
    id: 1,
    value: 1,
    label: "Studio",
    linkTo: "studio",
  },
  {
    id: 2,
    value: 2,
    label: "Nhiếp ảnh",
    linkTo: "photographer",
  },
  {
    id: 3,
    value: 3,
    label: "Trang phục",
    linkTo: "clothes",
  },
  {
    id: 4,
    value: 4,
    label: "Make up",
    linkTo: "makeup",
  },
  {
    id: 5,
    value: 5,
    label: "Thiết bị",
    linkTo: "device",
  },
  {
    id: 6,
    value: 6,
    label: "Người mẫu",
    linkTo: "model",
  },
];

export const handlerNameCategory = (category1) => {
  switch (String(category1)) {
    case "1":
      return "studio";
    case "2":
      return "photographer";
    case "3":
      return "clothes";
    case "4":
      return "makeup";
    case "5":
      return "device";
    case "6":
      return "model";
    default:
      return;
  }
};

export const statusHandler = (bookingStatus, paymentStatus) => {
  bookingStatus = Number(bookingStatus);
  paymentStatus = Number(paymentStatus);
  if (bookingStatus === 4 && paymentStatus === 1) {
    return "Chờ thanh toán";
  } else if (
    bookingStatus === 4 &&
    [4, 3, 2].some((item) => item === paymentStatus)
  ) {
    return "Sắp tới";
  } else if (
    bookingStatus === 1 &&
    [4, 3, 2].some((item) => item === paymentStatus)
  ) {
    return "Đã hoàn tất";
  } else if (
    bookingStatus === 3 &&
    [4, 3, 2,""].some((item) => item === paymentStatus)
  ) {
    return "Vắng mặt";
  } else if (bookingStatus === 2) {
    return "Đã huỷ";
  }
};
