

(function initializeDemoSeed() {
  if (!window.WisdomStorage) {
    console.error("WisdomStorage is required before demoSeed.js");
    return;
  }

  const USERS_KEY = "wisdom_users";
  const STUDENTS_KEY = "wisdom_students_demo";
  const TEACHERS_KEY = "wisdom_teachers_demo";
  const GROUPS_KEY = "wisdom_groups_demo";
  const PRIVATE_KEY = "wisdom_private_demo";

  const demoUsers = [
    {
      id: "admin-demo-001",
      name: "Admin Demo",
      email: "admin@wisdom.demo",
      password: "123456",
      role: "admin",
      status: "active",
      createdAt: new Date().toISOString()
    },
    {
      id: "teacher-demo-001",
      name: "Laura Méndez",
      email: "teacher@wisdom.demo",
      password: "123456",
      role: "teacher",
      teacherId: "T-001",
      teacherCode: "T-001",
      status: "active",
      createdAt: new Date().toISOString()
    },
    {
      id: "student-demo-001",
      name: "Juan Pérez",
      email: "student@wisdom.demo",
      password: "123456",
      role: "student",
      studentId: "WA-0001",
      studentCode: "WA-0001",
      status: "active",
      createdAt: new Date().toISOString()
    }
  ];

  const demoTeachers = [
    {
      id: "T-001",
      teacherId: "T-001",
      teacherCode: "T-001",
      name: "Laura Méndez",
      email: "teacher@wisdom.demo",
      phone: "+57 300 000 0003",
      status: "Activo",
      specialization: "B1 / Speaking"
    }
  ];

  const demoStudents = [
    {
      code: "WA-0001",
      name: "Juan Pérez",
      email: "student@wisdom.demo",
      phone: "+57 300 000 0001",
      whatsapp: "+57 300 000 0001",
      service: "Grupal",
      level: "B1 Threshold",
      teacher: "Laura Méndez",
      teacherId: "T-001",
      teacherCode: "T-001",
      group: "B1 Noche",
      status: "Activo",
      trackingLabel: "Clases asistidas",
      trackingValue: "2 / 4"
    },
    {
      code: "WA-0002",
      name: "Mariana Ruiz",
      email: "mariana@wisdom.demo",
      phone: "+57 300 000 0002",
      whatsapp: "+57 300 000 0002",
      service: "Privada",
      level: "A2 Waystage",
      teacher: "Laura Méndez",
      teacherId: "T-001",
      teacherCode: "T-001",
      group: "Paquete privado 20 horas",
      status: "Activo",
      trackingLabel: "Horas usadas",
      trackingValue: "3 / 20"
    }
  ];

  const demoGroups = [
    {
      id: "G-001",
      code: "G-001",
      name: "B1 Noche",
      level: "B1",
      teacher: "Laura Méndez",
      teacherId: "T-001",
      teacherCode: "T-001",
      status: "Activo",
      currentClass: 4,
      students: [
        {
          code: "WA-0001",
          name: "Juan Pérez"
        }
      ],
      attendance: {
        1: { "WA-0001": "present" },
        2: { "WA-0001": "present" },
        3: { "WA-0001": "absent" },
        4: { "WA-0001": "present" }
      }
    }
  ];

  const demoPrivatePackages = [
    {
      id: "P-001",
      code: "P-001",
      name: "Paquete privado 20 horas",
      type: "Privada",
      teacher: "Laura Méndez",
      teacherId: "T-001",
      teacherCode: "T-001",
      total: 20,
      status: "Activo",
      students: [
        {
          code: "WA-0002",
          name: "Mariana Ruiz"
        }
      ],
      sessions: [
        {
          id: "S-001",
          date: "2026-06-01",
          hours: 1,
          status: "Completada"
        },
        {
          id: "S-002",
          date: "2026-06-02",
          hours: 2,
          status: "Completada"
        }
      ]
    }
  ];

  function seedIfEmpty(key, data) {
    const existingData = WisdomStorage.get(key, []);

    if (!Array.isArray(existingData) || existingData.length === 0) {
      WisdomStorage.set(key, data);
      console.log(`Demo seed created: ${key}`);
    }
  }

  seedIfEmpty(USERS_KEY, demoUsers);
  seedIfEmpty(TEACHERS_KEY, demoTeachers);
  seedIfEmpty(STUDENTS_KEY, demoStudents);
  seedIfEmpty(GROUPS_KEY, demoGroups);
  seedIfEmpty(PRIVATE_KEY, demoPrivatePackages);
})();