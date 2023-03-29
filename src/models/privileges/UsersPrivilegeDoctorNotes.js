export default class UsersPrivilegeDoctorNotes {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.doctorNotesView = false;
    this.doctorNotesAdd = false;
    this.doctorNotesUpdate = false;
    this.doctorNotesArchive = false;
    this.doctorNotesRestore = false;
    this.doctorNotesDelete = false;
  }
  fillData(data) {
    if (data) {
      this.doctorNotesView = data.doctorNotesView;
      this.doctorNotesAdd = data.doctorNotesAdd;
      this.doctorNotesUpdate = data.doctorNotesUpdate;
      this.doctorNotesArchive = data.doctorNotesArchive;
      this.doctorNotesRestore = data.doctorNotesRestore;
      this.doctorNotesDelete = data.doctorNotesDelete;
    } else {
      this.setInitialValue();
    }
  }
}
