const STUDENTS_KEY='wisdom_students_demo'
const GROUPS_KEY='wisdom_groups_demo'
const PRIVATE_KEY='wisdom_private_demo'
const fallbackStudents=[
  {code:'WA-0001',name:'Juan Pérez',service:'Grupal',level:'B1',teacher:'Laura',group:'B1 Noche',status:'Activo',trackingLabel:'Clases asistidas',trackingValue:'28 / 48'},
  {code:'WA-0002',name:'Mariana Ruiz',service:'Privada',level:'A2',teacher:'Carlos',group:'Paquete 20 horas',status:'Activo',trackingLabel:'Horas usadas',trackingValue:'8 / 20'}
]
const fallbackGroups=[
  {id:'G-001',name:'B1 Noche',level:'B1',teacher:'Laura Méndez',currentClass:18,students:[{code:'WA-0001',name:'Juan Pérez'}],attendance:{}},
  {id:'G-002',name:'A2 Mañana',level:'A2',teacher:'Carlos Peña',currentClass:9,students:[],attendance:{}}
]
function safeJsonParse(value,fallback){try{return value?JSON.parse(value):fallback}catch(error){return fallback}}
function loadData(key,fallback=[]){const data=safeJsonParse(localStorage.getItem(key),fallback);return Array.isArray(data)?data:fallback}
function saveData(key,value){localStorage.setItem(key,JSON.stringify(value))}
function loadStudents(){return loadData(STUDENTS_KEY,fallbackStudents)}
function loadGroups(){return loadData(GROUPS_KEY,fallbackGroups)}
function loadPackages(){return loadData(PRIVATE_KEY,[])}
function normalizePackage(p){return {...p,total:Number(p?.total)||20,students:Array.isArray(p?.students)?p.students:[],sessions:Array.isArray(p?.sessions)?p.sessions:[]}}
function usedHours(p){return normalizePackage(p).sessions.reduce((sum,item)=>sum+(Number(item.hours)||0),0)}
function remainingHours(p){const pkg=normalizePackage(p);return Math.max(0,pkg.total-usedHours(pkg))}
function packageStatus(p){const r=remainingHours(p);if(r===0)return 'Completado';if(r<=3)return 'Por agotarse';return 'Activo'}
function groupProgress(group){return Math.min(100,((Number(group.currentClass)||0)/48)*100)}
function studentRisk(student){return student.status==='En riesgo'||student.attendancePercent<70}
function getStudentFromURL(){return new URLSearchParams(window.location.search).get('code')}