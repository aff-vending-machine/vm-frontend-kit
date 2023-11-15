import * as XLSX from 'xlsx';
import Papa from 'papaparse';

export const exportCSV = (filename: string, data: object[]) => {
  let url = '';
  const buffer = Papa.unparse(data);
  const csvData = new Blob([buffer], { type: 'text/csv;charset=utf-8;' });
  url = window.URL.createObjectURL(csvData);

  const tempLink = document.createElement('a');
  tempLink.href = url;
  tempLink.setAttribute('download', `${filename}.csv`);
  tempLink.click();
};

const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8,%EF%BB%BF';

export const exportXlsx = (filename: string, data: object[]) => {
  let url = '';
  const headers = Object.keys(data[0]);
  const stringData: unknown[][] = [headers];

  data.forEach(item => stringData.push(Object.values(item)));

  const workSheet = XLSX.utils.aoa_to_sheet(stringData);
  const workBook = {
    Sheets: { data: workSheet },
    SheetNames: ['data'],
  };

  const excelBuffer = XLSX.write(workBook, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'array',
  });

  const xlsxData = new Blob([excelBuffer], { type: fileType });
  url = window.URL.createObjectURL(xlsxData);

  const tempLink = document.createElement('a');
  tempLink.href = url;
  tempLink.setAttribute('download', `${filename}.xlsx`);
  tempLink.click();
};
