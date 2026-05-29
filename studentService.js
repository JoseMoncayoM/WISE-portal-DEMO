// /js/services/studentService.js

const StudentService = {
  STORAGE_KEY: "wisdom.students",

  getAll() {
    return WisdomStorage.get(this.STORAGE_KEY, []);
  },

  getById(studentId) {
    return this.getAll().find(student => student.id === studentId) || null;
  },

  getByTeacherId(teacherId) {
    return this.getAll().filter(student => student.assignedTeacherId === teacherId);
  },

  create(studentData) {
    const students = this.getAll();

    const newStudent = {
      id: crypto.randomUUID(),
      fullName: studentData.fullName?.trim() || "",
      email: studentData.email?.trim() || "",
      phone: studentData.phone?.trim() || "",
      level: studentData.level || "A1",
      status: studentData.status || "active",
      assignedTeacherId: studentData.assignedTeacherId || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    students.push(newStudent);
    WisdomStorage.set(this.STORAGE_KEY, students);

    return newStudent;
  },

  update(studentId, updates) {
    const students = this.getAll();
    const index = students.findIndex(student => student.id === studentId);

    if (index === -1) return null;

    students[index] = {
      ...students[index],
      ...updates,
      id: students[index].id,
      createdAt: students[index].createdAt,
      updatedAt: new Date().toISOString()
    };

    WisdomStorage.set(this.STORAGE_KEY, students);

    return students[index];
  },

  delete(studentId) {
    const students = this.getAll();
    const filtered = students.filter(student => student.id !== studentId);

    if (filtered.length === students.length) return false;

    WisdomStorage.set(this.STORAGE_KEY, filtered);
    return true;
  }
};