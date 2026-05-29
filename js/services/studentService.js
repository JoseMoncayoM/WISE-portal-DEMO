// /js/services/studentService.js

alert("studentService cargó");
window.StudentService = {
  STORAGE_KEY: "wisdom.students",

  getAll() {
    return WisdomStorage.get(this.STORAGE_KEY, []);
  },

  getById(studentId) {
    if (!studentId) return null;

    return this.getAll().find(
      student => student.id === studentId
    ) || null;
  },

  getByTeacherId(teacherId) {
    if (!teacherId) return [];

    return this.getAll().filter(
      student => student.assignedTeacherId === teacherId
    );
  },

  create(studentData = {}) {
    const students = this.getAll();

    const newStudent = {
      ...SchemaRegistry.student,

      ...studentData,

      id: crypto.randomUUID(),

      fullName: studentData.fullName?.trim() || "",
      email: studentData.email?.trim() || "",
      phone: studentData.phone?.trim() || "",

      level: studentData.level || "A1",
      status: studentData.status || "active",

      assignedTeacherId:
        studentData.assignedTeacherId || null,

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    students.push(newStudent);

    WisdomStorage.set(this.STORAGE_KEY, students);

    return newStudent;
  },

  update(studentId, updates = {}) {
    if (!studentId) return null;

    const students = this.getAll();

    const studentIndex = students.findIndex(
      student => student.id === studentId
    );

    if (studentIndex === -1) {
      return null;
    }

    const existingStudent = students[studentIndex];

    const updatedStudent = {
      ...existingStudent,
      ...updates,

      id: existingStudent.id,

      createdAt: existingStudent.createdAt,

      updatedAt: new Date().toISOString()
    };

    students[studentIndex] = updatedStudent;

    WisdomStorage.set(this.STORAGE_KEY, students);

    return updatedStudent;
  },

  delete(studentId) {
    if (!studentId) return false;

    const students = this.getAll();

    const filteredStudents = students.filter(
      student => student.id !== studentId
    );

    if (filteredStudents.length === students.length) {
      return false;
    }

    WisdomStorage.set(
      this.STORAGE_KEY,
      filteredStudents
    );

    return true;
  },

  exists(studentId) {
    return !!this.getById(studentId);
  },

  count() {
    return this.getAll().length;
  }
};