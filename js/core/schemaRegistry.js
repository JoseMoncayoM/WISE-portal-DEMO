/* Wisdom Academy — Schema Registry
   Conservative normalization layer for localStorage → future backend migration.
*/

(function () {
  function generateId(prefix) {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  }

  function nowISO() {
    return new Date().toISOString();
  }

  function firstValid(...values) {
    return values.find(v => v !== undefined && v !== null && v !== "");
  }

  function ensureArray(value) {
    if (Array.isArray(value)) return value;
    if (!value) return [];
    return [value];
  }

  const SchemaRegistry = {
    version: "1.0.0",

    normalizeStudent(raw = {}) {
      const id = firstValid(raw.id, raw.studentId, raw.code, generateId("stu"));

      return {
        ...raw,
        id,
        studentId: firstValid(raw.studentId, id),
        code: firstValid(raw.code, raw.studentCode, id),
        name: firstValid(raw.name, raw.fullName, ""),
        email: firstValid(raw.email, ""),
        phone: firstValid(raw.phone, raw.whatsapp, ""),
        status: firstValid(raw.status, "active"),
        teacherId: firstValid(raw.teacherId, raw.assignedTeacherId, null),
        groupIds: ensureArray(raw.groupIds),
        privatePackageIds: ensureArray(raw.privatePackageIds),
        createdAt: firstValid(raw.createdAt, nowISO()),
        updatedAt: nowISO(),
        schemaType: "Student",
        schemaVersion: this.version
      };
    },

    normalizeTeacher(raw = {}) {
      const id = firstValid(raw.id, raw.teacherId, raw.code, generateId("tea"));

      return {
        ...raw,
        id,
        teacherId: firstValid(raw.teacherId, id),
        code: firstValid(raw.code, raw.teacherCode, id),
        name: firstValid(raw.name, raw.fullName, ""),
        email: firstValid(raw.email, ""),
        phone: firstValid(raw.phone, raw.whatsapp, ""),
        status: firstValid(raw.status, "active"),
        assignedStudentIds: ensureArray(raw.assignedStudentIds),
        assignedGroupIds: ensureArray(raw.assignedGroupIds),
        createdAt: firstValid(raw.createdAt, nowISO()),
        updatedAt: nowISO(),
        schemaType: "Teacher",
        schemaVersion: this.version
      };
    },

    normalizeUser(raw = {}) {
      const id = firstValid(raw.id, raw.userId, generateId("usr"));

      return {
        ...raw,
        id,
        userId: firstValid(raw.userId, id),
        role: firstValid(raw.role, "STUDENT"),
        email: firstValid(raw.email, ""),
        username: firstValid(raw.username, raw.email, ""),
        studentId: firstValid(raw.studentId, null),
        teacherId: firstValid(raw.teacherId, null),
        status: firstValid(raw.status, "active"),
        createdAt: firstValid(raw.createdAt, nowISO()),
        updatedAt: nowISO(),
        schemaType: "User",
        schemaVersion: this.version
      };
    },

    normalizeGroup(raw = {}) {
      const id = firstValid(raw.id, raw.groupId, raw.code, generateId("grp"));

      return {
        ...raw,
        id,
        groupId: firstValid(raw.groupId, id),
        code: firstValid(raw.code, id),
        name: firstValid(raw.name, raw.groupName, ""),
        teacherId: firstValid(raw.teacherId, null),
        students: ensureArray(raw.students),
        studentIds: ensureArray(raw.studentIds),
        scheduleDays: ensureArray(raw.scheduleDays),
        startTime: firstValid(raw.startTime, ""),
        endTime: firstValid(raw.endTime, ""),
        modality: firstValid(raw.modality, ""),
        classroom: firstValid(raw.classroom, raw.location, ""),
        minStudents: firstValid(raw.minStudents, 5),
        maxStudents: firstValid(raw.maxStudents, 10),
        status: firstValid(raw.status, "active"),
        createdAt: firstValid(raw.createdAt, nowISO()),
        updatedAt: nowISO(),
        schemaType: "Group",
        schemaVersion: this.version
      };
    },

    normalizePrivatePackage(raw = {}) {
      const id = firstValid(raw.id, raw.packageId, raw.privateId, generateId("pkg"));

      return {
        ...raw,
        id,
        packageId: firstValid(raw.packageId, id),
        teacherId: firstValid(raw.teacherId, null),
        students: ensureArray(raw.students),
        studentIds: ensureArray(raw.studentIds),
        totalSessions: Number(firstValid(raw.totalSessions, 0)),
        completedSessions: Number(firstValid(raw.completedSessions, 0)),
        scheduleDays: ensureArray(raw.scheduleDays),
        startTime: firstValid(raw.startTime, ""),
        endTime: firstValid(raw.endTime, ""),
        modality: firstValid(raw.modality, ""),
        classroom: firstValid(raw.classroom, raw.location, ""),
        status: firstValid(raw.status, "active"),
        createdAt: firstValid(raw.createdAt, nowISO()),
        updatedAt: nowISO(),
        schemaType: "PrivatePackage",
        schemaVersion: this.version
      };
    },

    normalizeEvaluation(raw = {}) {
      const id = firstValid(raw.id, raw.evaluationId, generateId("eva"));

      return {
        ...raw,
        id,
        evaluationId: firstValid(raw.evaluationId, id),
        studentId: firstValid(raw.studentId, null),
        teacherId: firstValid(raw.teacherId, null),
        type: firstValid(raw.type, raw.evaluationType, ""),
        skill: firstValid(raw.skill, ""),
        score: firstValid(raw.score, null),
        status: firstValid(raw.status, "submitted"),
        submittedAt: firstValid(raw.submittedAt, raw.createdAt, nowISO()),
        createdAt: firstValid(raw.createdAt, nowISO()),
        updatedAt: nowISO(),
        schemaType: "Evaluation",
        schemaVersion: this.version
      };
    },

    normalizeResult(raw = {}) {
      const id = firstValid(raw.id, raw.resultId, generateId("res"));

      return {
        ...raw,
        id,
        resultId: firstValid(raw.resultId, id),
        evaluationId: firstValid(raw.evaluationId, null),
        studentId: firstValid(raw.studentId, null),
        score: firstValid(raw.score, null),
        level: firstValid(raw.level, raw.cefrLevel, ""),
        feedback: firstValid(raw.feedback, ""),
        createdAt: firstValid(raw.createdAt, nowISO()),
        updatedAt: nowISO(),
        schemaType: "Result",
        schemaVersion: this.version
      };
    },

    normalizePlacementResult(raw = {}) {
      const id = firstValid(raw.id, raw.placementId, generateId("plc"));

      return {
        ...raw,
        id,
        placementId: firstValid(raw.placementId, id),
        studentId: firstValid(raw.studentId, null),
        cefrLevel: firstValid(raw.cefrLevel, raw.level, ""),
        confidence: firstValid(raw.confidence, null),
        weakAreas: ensureArray(raw.weakAreas),
        errorPatterns: ensureArray(raw.errorPatterns),
        recommendation: firstValid(raw.recommendation, ""),
        createdAt: firstValid(raw.createdAt, nowISO()),
        updatedAt: nowISO(),
        schemaType: "PlacementResult",
        schemaVersion: this.version
      };
    },

    normalizeCollection(items, normalizerName) {
      if (!Array.isArray(items)) return [];
      if (typeof this[normalizerName] !== "function") return items;
      return items.map(item => this[normalizerName](item));
    }
  };

  window.SchemaRegistry = SchemaRegistry;
})();