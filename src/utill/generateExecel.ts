import * as ExcelJS from 'exceljs';

export async function generateExcel(data) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');

  // const data = [
  //   {
  //     fitness_machine_id: 1,
  //     repetition: 20,
  //     set: 4,
  //     weight: 200,
  //     total_weight: 3000,
  //   },
  //   {
  //     fitness_machine_id: 2,
  //     repetition: 15,
  //     set: 3,
  //     weight: 150,
  //     total_weight: 2250,
  //   },
  //   // 추가 데이터
  // ];
  worksheet.columns = [
    { header: 'Fitness Machine ID', key: 'fitness_machine_id', width: 20 },
    { header: 'Repetition', key: 'repetition', width: 15 },
    { header: 'Set', key: 'set', width: 10 },
    { header: 'Weight', key: 'weight', width: 15 },
    { header: 'Total Weight', key: 'total_weight', width: 20 },
  ];

  data.forEach((item) => {
    worksheet.addRow({
      fitness_machine_id: item.fitness_machine_id,
      repetition: item.repetition,
      set: item.set,
      weight: item.weight,
      total_weight: item.total_weight,
    });
  });

  // 파일을 버퍼로 저장
  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
}
