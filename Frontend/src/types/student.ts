export interface Student {
  id: string;
  userId: string;
  parent?: ParentInfo;
  studentName: string;
  rollNumber: string;
  grade: string;
  assignedBusId: string | null;
  assignedBus?: BusSummary;
  assignedStopId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ParentInfo {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

export interface BusSummary {
  id: string;
  busNumber: string;
  capacity: number;
  busModel?: string;
}

export interface CreateStudentRequest {
  parentUserId: string;
  studentName: string;
  rollNumber: string;
  grade: string;
}

export interface AssignStudentBusStopRequest {
  studentId: string;
  busId: string;
  stopId: string | null;
}

export interface BulkImportStudentRow {
  parentEmail: string;
  studentName: string;
  rollNumber: string;
  grade: string;
  parentName?: string;
  parentPhone?: string;
}

export interface BulkImportResult {
  message: string;
  totalRows: number;
  importedCount: number;
  skippedCount: number;
  imported: Array<{ studentName: string; rollNumber: string; parentEmail: string }>;
  skipped: Array<{ row: BulkImportStudentRow; reason: string }>;
}