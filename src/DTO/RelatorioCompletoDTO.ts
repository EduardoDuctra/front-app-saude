export interface RelatorioCompletoDTO {
  data: string; // data do relatório (ex: "2025-11-04")
  peso?: number; // pode ser null
  glicose?: number;
  colesterolHDL?: number;
  colesterolVLDL?: number;
  creatina?: number;
  trigliceridio?: number;
}
