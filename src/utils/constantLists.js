import i18n from "@/i18n/index.js";

export const EMPLOYEE_TYPE = {
  Employee: "EMT-1",
  Admin: "EMT-2",
  FounderOfSystem: "EMT-3",
  Receptionist: "EMT-4",
  Doctor: "EMT-5",
};

export const RESERVATION_STATUS = {
  pending: "RTT-1", // Reservations pending الحجوزات المعلقة
  current: "RTT-2", // Current reservations الحجوزات الحالية
  waitingApprovalCancel: "RTT-3", // Waiting Approval Cancel في انتظار التأكيد علي إلغاء الحجز
  canceledBeforeApproval: "RTT-4", // Canceled Before Approval الحجوزات الملغية قبل التأكيد علي الحجز
  canceledAfterApproval: "RTT-5", // Canceled After Approval الحجوزات الملغية بعد التأكيد علي الحجز
  attended: "RTT-6", // Attend To center حضر بالمركز
  entered: "RTT-7", // Service Reservations الحجوزات بالخدمة
  waitingReEntry: "RTT-8", // Reservations awaiting re-entry الحجوزات المنتظرة الدخول مره اخري
  finished: "RTT-9", // Finish reservations الحجوزات المنتهية
};

export const PAGE_GO_TO = {
  CurrentReservations: "PGT-1", // Current reservations الحجوزات الحالية
  RequestReservations: "PGT-2", // Request reservations الحجوزات المطلوبة
  RejectedReservations: "PGT-3", // Rejected reservations الحجوزات المرفوضة
  News: "PGT-5", // News الأخبار
  Offers: "PGT-6", // Offers العروض
  ReservationMedia: "PGT-7", // Reservation Media وسائط الحجز
  Complaints: "PGT-8", // Complaints الشكاوى
  WalletTransactions: "PGT-9", // Wallet Transactions التعاملات المالية
  PointsTransaction: "PGT-10", // Points Transaction نقاط العملاء
};

export const REQUIREMENTS_TYPE_TOKENS = {
  Rays: "RET-1", //  rays أشعة
  MedicalTests: "RET-2", //  analyzes تحاليل
};

export const ADDICTIVESTUFFS_TYPE_TOKENS = {
  Habits: "AST-1",
  Diseases: "AST-2",
};

export const PAY_TYPE = {
  reservation: "SRP-1", //  reservation حجوزات
  reservationAddedServices: "SRP-2", //  reservation Added Services خدمات مضافة علي الحجز
};

export const RESERVATION_TYPES = {
  mainReservation: "SRT-1", //  main Reservation حجز رئيسي
  followingReservation: "SRT-2", //  following Reservation حجز تابع لحجز رئيسي
};

export const USER_ROLE_TOKEN = {
  client: "ERT-1",
  employee: "ERT-2",
  contractor: "ERT-3",
};

export const USER_POINT_TYPE_TOKEN = {
  client: "UPT-1",
  employee: "UPT-2",
  contractor: "UPT-3",
};

export const WALLET_TRANSACTIONS_TYPE_TOKEN_OPTIONS = [
  {
    value: "",
    text: i18n.t("pointsAndWallets.wallets.selectTransactionType"),
  },
  {
    value: "TPT-1",
    text: i18n.t("pointsAndWallets.wallets.increase"),
  },
  {
    value: "TPT-2",
    text: i18n.t("pointsAndWallets.wallets.decrease"),
  },
];

// #region CHARTJS
const CHARTJS_COLORS = ["#00afb9", "#d90429", "#fee440", "#7b2cbf", "#38b000"];
export const CHARTJS = {
  colors: CHARTJS_COLORS,
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
  chartData: {
    labels: ["label"],
    datasets: [
      {
        label: "label",
        backgroundColor: CHARTJS_COLORS,
        data: [0],
      },
    ],
  },
};
// #endregion CHARTJS

export const SURGERY_PLACE_TYPE = {
  InsideCenter: "SPTT-1",
  OutsideCenter: "SPTT-2",
  All: "SPTT-3",
};
