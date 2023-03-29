import axios from "axios";

import UsersPersonal from "@/models/privileges/UsersPersonal";
import UsersPrivilegeWalletTransaction from "@/models/privileges/UsersPrivilegeWalletTransaction";
import UsersPrivilegeTransactionPointsHistory from "@/models/privileges/UsersPrivilegeTransactionPointsHistory";
import UsersPrivilegeEmployees from "@/models/privileges/UsersPrivilegeEmployees";
import UsersPrivilegeServiceResponsibleBonuses from "@/models/privileges/UsersPrivilegeServiceResponsibleBonuses";
import UsersPrivilegeServicesReservationEmployeeBenefit from "@/models/privileges/UsersPrivilegeServicesReservationEmployeeBenefit";
import UsersPrivilegeUsers from "@/models/privileges/UsersPrivilegeUsers";
import UsersPrivilegeEstablishmentsSettings from "@/models/privileges/UsersPrivilegeEstablishmentsSettings";
import UsersPrivilegAdditionalSettings from "@/models/privileges/UsersPrivilegAdditionalSettings";
import UsersPrivilegeBranches from "@/models/privileges/UsersPrivilegeBranches";
import UsersPrivilegeClients from "@/models/privileges/UsersPrivilegeClients";
import UsersPrivilegeOfficesTimes from "@/models/privileges/UsersPrivilegeOfficesTimes";
import UsersPrivilegeServicesReservations from "@/models/privileges/UsersPrivilegeServicesReservations";
import UsersPrivilegeReports from "@/models/privileges/UsersPrivilegeReports";
import UsersPrivilegeStatistics from "@/models/privileges/UsersPrivilegeStatistics";
import UsersPrivilegeNews from "@/models/privileges/UsersPrivilegeNews";
import UsersPrivilegeOffers from "@/models/privileges/UsersPrivilegeOffers";
import UsersPrivilegeTreasuries from "@/models/privileges/UsersPrivilegeTreasuries";
import UsersPrivilegeTreasuriesTransaction from "@/models/privileges/UsersPrivilegeTreasuriesTransaction";
import UsersPrivilegeExpenses from "@/models/privileges/UsersPrivilegeExpenses";
import UsersPrivilegeRevenus from "@/models/privileges/UsersPrivilegeRevenus";
import UsersPrivilegeServiceReservationMedia from "@/models/privileges/UsersPrivilegeServiceReservationMedia";
import UsersPrivilegeMedicationPlan from "@/models/privileges/UsersPrivilegeMedicationPlan";
import UsersPrivilegeMedicalRequirementsPlan from "@/models/privileges/UsersPrivilegeMedicalRequirementsPlan";
import UsersPrivilegeDiagnosisPlan from "@/models/privileges/UsersPrivilegeDiagnosisPlan";
import UsersPrivilegeServicesReservationAddedServices from "@/models/privileges/UsersPrivilegeServicesReservationAddedServices";
import UsersPrivilegeDoctorNotes from "@/models/privileges/UsersPrivilegeDoctorNotes";
import UsersPrivilegeCurePlans from "@/models/privileges/UsersPrivilegeCurePlans";
import UsersPrivilegeSurgriesHistory from "@/models/privileges/UsersPrivilegeSurgriesHistory";
import UsersPrivilegeQuestionPlan from "@/models/privileges/UsersPrivilegeQuestionPlan";
import UsersPrivilegeAddictiveStuffClient from "@/models/privileges/UsersPrivilegeAddictiveStuffClient";
import UsersPrivilegeMedicalAlerts from "@/models/privileges/UsersPrivilegeMedicalAlerts";

export default class UserPrivilege {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.usersPersonalData = new UsersPersonal();
    this.usersPrivilegeTransactionPointsHistory =
      new UsersPrivilegeTransactionPointsHistory();
    this.usersPrivilegeWalletTransaction =
      new UsersPrivilegeWalletTransaction();
    this.usersPrivilegeEmployees = new UsersPrivilegeEmployees();
    this.usersPrivilegeServiceResponsibleBonuses =
      new UsersPrivilegeServiceResponsibleBonuses();
    this.usersPrivilegeServicesReservationEmployeeBenefit =
      new UsersPrivilegeServicesReservationEmployeeBenefit();
    this.usersPrivilegeUsers = new UsersPrivilegeUsers();
    this.usersPrivilegeEstablishmentsSettings =
      new UsersPrivilegeEstablishmentsSettings();
    this.usersPrivilegAdditionalSettings =
      new UsersPrivilegAdditionalSettings();
    this.usersPrivilegeBranches = new UsersPrivilegeBranches();
    this.usersPrivilegeClients = new UsersPrivilegeClients();
    this.usersPrivilegeOfficesTimes = new UsersPrivilegeOfficesTimes();
    this.usersPrivilegeServicesReservations =
      new UsersPrivilegeServicesReservations();
    this.usersPrivilegeReports = new UsersPrivilegeReports();
    this.usersPrivilegeStatistics = new UsersPrivilegeStatistics();
    this.usersPrivilegeNews = new UsersPrivilegeNews();
    this.usersPrivilegeOffers = new UsersPrivilegeOffers();
    this.usersPrivilegeTreasuries = new UsersPrivilegeTreasuries();
    this.usersPrivilegeTreasuriesTransaction =
      new UsersPrivilegeTreasuriesTransaction();
    this.usersPrivilegeExpenses = new UsersPrivilegeExpenses();
    this.usersPrivilegeRevenus = new UsersPrivilegeRevenus();
    this.usersPrivilegeServiceReservationMedia =
      new UsersPrivilegeServiceReservationMedia();
    this.usersPrivilegeMedicationPlan = new UsersPrivilegeMedicationPlan();
    this.usersPrivilegeMedicalRequirementsPlan =
      new UsersPrivilegeMedicalRequirementsPlan();
    this.usersPrivilegeDiagnosisPlan = new UsersPrivilegeDiagnosisPlan();
    this.usersPrivilegeServicesReservationAddedServices =
      new UsersPrivilegeServicesReservationAddedServices();
    this.usersPrivilegeDoctorNotes = new UsersPrivilegeDoctorNotes();
    this.usersPrivilegeCurePlans = new UsersPrivilegeCurePlans();
    this.usersPrivilegeSurgriesHistory = new UsersPrivilegeSurgriesHistory();
    this.usersPrivilegeQuestionPlan = new UsersPrivilegeQuestionPlan();
    this.usersPrivilegeAddictiveStuffClient =
      new UsersPrivilegeAddictiveStuffClient();
    this.usersPrivilegeMedicalAlerts = new UsersPrivilegeMedicalAlerts();
  }
  fillData(data) {
    this.usersPersonalData.fillData(data.usersPersonalData);
    this.usersPrivilegeWalletTransaction.fillData(
      data.usersPrivilegeWalletTransaction
    );
    this.usersPrivilegeTransactionPointsHistory.fillData(
      data.usersPrivilegeTransactionPointsHistory
    );
    this.usersPrivilegeEmployees.fillData(data.usersPrivilegeEmployees);
    this.usersPrivilegeServiceResponsibleBonuses.fillData(
      data.usersPrivilegeServiceResponsibleBonuses
    );
    this.usersPrivilegeServicesReservationEmployeeBenefit.fillData(
      data.usersPrivilegeServicesReservationEmployeeBenefit
    );
    this.usersPrivilegeUsers.fillData(data.usersPrivilegeUsers);
    this.usersPrivilegeEstablishmentsSettings.fillData(
      data.usersPrivilegeEstablishmentsSettings
    );
    this.usersPrivilegAdditionalSettings.fillData(
      data.usersPrivilegAdditionalSettings
    );
    this.usersPrivilegeBranches.fillData(data.usersPrivilegeBranches);
    this.usersPrivilegeClients.fillData(data.usersPrivilegeClients);
    this.usersPrivilegeOfficesTimes.fillData(data.usersPrivilegeOfficesTimes);
    this.usersPrivilegeServicesReservations.fillData(
      data.usersPrivilegeServicesReservations
    );
    this.usersPrivilegeReports.fillData(data.usersPrivilegeReports);
    this.usersPrivilegeStatistics.fillData(data.usersPrivilegeStatistics);
    this.usersPrivilegeNews.fillData(data.usersPrivilegeNews);
    this.usersPrivilegeOffers.fillData(data.usersPrivilegeOffers);
    this.usersPrivilegeTreasuries.fillData(data.usersPrivilegeTreasuries);
    this.usersPrivilegeTreasuriesTransaction.fillData(
      data.usersPrivilegeTreasuriesTransaction
    );
    this.usersPrivilegeExpenses.fillData(data.usersPrivilegeExpenses);
    this.usersPrivilegeRevenus.fillData(data.usersPrivilegeRevenus);
    this.usersPrivilegeServiceReservationMedia.fillData(
      data.usersPrivilegeServiceReservationMedia
    );
    this.usersPrivilegeMedicationPlan.fillData(
      data.usersPrivilegeMedicationPlan
    );
    this.usersPrivilegeMedicalRequirementsPlan.fillData(
      data.usersPrivilegeMedicalRequirementsPlan
    );
    this.usersPrivilegeDiagnosisPlan.fillData(data.usersPrivilegeDiagnosisPlan);
    this.usersPrivilegeServicesReservationAddedServices.fillData(
      data.usersPrivilegeServicesReservationAddedServices
    );
    this.usersPrivilegeDoctorNotes.fillData(data.usersPrivilegeDoctorNotes);
    this.usersPrivilegeCurePlans.fillData(data.usersPrivilegeCurePlans);
    this.usersPrivilegeSurgriesHistory.fillData(
      data.usersPrivilegeSurgriesHistory
    );
    this.usersPrivilegeQuestionPlan.fillData(data.usersPrivilegeQuestionPlan);
    this.usersPrivilegeAddictiveStuffClient.fillData(
      data.usersPrivilegeAddictiveStuffClient
    );
    this.usersPrivilegeMedicalAlerts.fillData(data.usersPrivilegeMedicalAlerts);
  }

  async getUserPrivilege(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/UsersPrivilege//GetUserPrivilege?language=${language}&userAuthorizeToken=${userAuthorizeToken}&employeeToken=${this.usersPersonalData.employeeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async updateUserPrivilege() {
    var data = {
      usersPersonalData: this.usersPersonalData,
      usersPrivilegeTransactionPointsHistory:
        this.usersPrivilegeTransactionPointsHistory,
      usersPrivilegeWalletTransaction: this.usersPrivilegeWalletTransaction,
      usersPrivilegeEmployees: this.usersPrivilegeEmployees,
      usersPrivilegeServiceResponsibleBonuses:
        this.usersPrivilegeServiceResponsibleBonuses,
      usersPrivilegeServicesReservationEmployeeBenefit:
        this.usersPrivilegeServicesReservationEmployeeBenefit,
      usersPrivilegeUsers: this.usersPrivilegeUsers,
      usersPrivilegeEstablishmentsSettings:
        this.usersPrivilegeEstablishmentsSettings,
      usersPrivilegAdditionalSettings: this.usersPrivilegAdditionalSettings,
      usersPrivilegeBranches: this.usersPrivilegeBranches,
      usersPrivilegeClients: this.usersPrivilegeClients,
      usersPrivilegeOfficesTimes: this.usersPrivilegeOfficesTimes,
      usersPrivilegeServicesReservations:
        this.usersPrivilegeServicesReservations,
      usersPrivilegeReports: this.usersPrivilegeReports,
      usersPrivilegeStatistics: this.usersPrivilegeStatistics,
      usersPrivilegeNews: this.usersPrivilegeNews,
      usersPrivilegeOffers: this.usersPrivilegeOffers,
      usersPrivilegeTreasuries: this.usersPrivilegeTreasuries,
      usersPrivilegeTreasuriesTransaction:
        this.usersPrivilegeTreasuriesTransaction,
      usersPrivilegeExpenses: this.usersPrivilegeExpenses,
      usersPrivilegeRevenus: this.usersPrivilegeRevenus,
      usersPrivilegeServiceReservationMedia:
        this.usersPrivilegeServiceReservationMedia,
      usersPrivilegeMedicationPlan: this.usersPrivilegeMedicationPlan,
      usersPrivilegeMedicalRequirementsPlan:
        this.usersPrivilegeMedicalRequirementsPlan,
      usersPrivilegeDiagnosisPlan: this.usersPrivilegeDiagnosisPlan,
      usersPrivilegeServicesReservationAddedServices:
        this.usersPrivilegeServicesReservationAddedServices,
      usersPrivilegeDoctorNotes: this.usersPrivilegeDoctorNotes,
      usersPrivilegeCurePlans: this.usersPrivilegeCurePlans,
      usersPrivilegeSurgriesHistory: this.usersPrivilegeSurgriesHistory,
      usersPrivilegeQuestionPlan: this.usersPrivilegeQuestionPlan,
      usersPrivilegeAddictiveStuffClient:
        this.usersPrivilegeAddictiveStuffClient,
      usersPrivilegeMedicalAlerts: this.usersPrivilegeMedicalAlerts,
    };

    try {
      let response = await axios.post(
        `/UsersPrivilege//UpdateUserPrivilege`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
