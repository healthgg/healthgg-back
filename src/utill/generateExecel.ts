import * as ExcelJS from 'exceljs';

export async function generateVolumeExcel(data) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');

  if (Object.keys(data[0])[0].includes('fitness')) {
    // worksheet.columns = [
    //   { header: '운동기구', key: 'fitness_machine_name', width: 20 },
    //   { header: '반복 횟수', key: 'repetition', width: 20 },
    //   { header: '세트 수', key: 'set', width: 20 },
    //   { header: '중량', key: 'weight', width: 20 },
    //   { header: '총 중량', key: 'total_weight', width: 20 },
    // ];

    const titles = ['운동기구', '반복 횟수', '세트 수', '중량', '총 중량'];
    titles.forEach((title, index) => {
      worksheet.getCell(`A${index + 1}`).value = title;
    });

    const columns = [
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];
    for (let i = 0; i < data.length; i++) {
      const col = columns[i]; // Get the current column letter

      worksheet.getRow(1);
      worksheet.getRow(2);
      worksheet.getRow(3);
      worksheet.getRow(4);
      worksheet.getRow(5);

      worksheet.getCell(`${col}1`).value = data[i].fitness_machine_name; // B1, C1, D1, etc.
      worksheet.getCell(`${col}2`).value = data[i].repetition; // B2, C2, D2, etc.
      worksheet.getCell(`${col}3`).value = data[i].set; // B3, C3, D3, etc.
      worksheet.getCell(`${col}4`).value = data[i].weight; // B4, C4, D4, etc.
      worksheet.getCell(`${col}5`).value = `${data[i].total_weight} (kg)`; // B5, C5, D5, etc.
    }
  }

  worksheet.getCell;

  worksheet.getColumn(1).eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '00000000' }, // 배경색 빨강
    };
    cell.font = {
      color: { argb: 'FFFFFFFF' }, // 글자색 흰색
      bold: true,
      size: 16,
    };
    cell.alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
  });
  // 파일을 버퍼로 저장
  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
}

// //영양소엑셀
export async function generateFoodExcel(data) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');

  if (data.Breakfast) {
    worksheet.columns = [
      { header: '', width: 20 },
      { header: '영양소 이름', key: 'food_name', width: 20 },
      { header: '칼로리 (g)', key: 'calory', width: 20 },
      { header: '단백질 (g)', key: 'protein', width: 20 },
      { header: '탄수화물 (g)', key: 'carbohydrate', width: 20 },
      { header: 'fat (g)', key: 'fat', width: 20 },
    ];

    const mealTimes = Object.keys(data);
    let currentRow = 2; // Start after header row

    mealTimes.forEach((meal, index) => {
      const mealData = data[meal];
      const mealLength = mealData.length;

      // Calculate start and end rows for merging
      let startRow = currentRow;
      let endRow = startRow + mealLength - 1;

      // Merge cells for meal time column
      worksheet.mergeCells(`A${startRow}:A${endRow}`);
      worksheet.getCell(`A${startRow}`).value = meal;

      // Populate data rows
      mealData.forEach((item) => {
        worksheet.getCell(`B${currentRow}`).value = item.food_name;
        worksheet.getCell(`C${currentRow}`).value = item.calory;
        worksheet.getCell(`D${currentRow}`).value = item.protein;
        worksheet.getCell(`E${currentRow}`).value = item.carbohydrate;
        worksheet.getCell(`F${currentRow}`).value = item.fat;
        currentRow++;
      });
    });

    // Style the header row
    worksheet.getRow(1).eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '00000000' }, // Black background
      };
      cell.font = {
        color: { argb: 'FFFFFFFF' }, // White font
        bold: true,
        size: 16,
      };
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };
    });

    const totalRow = worksheet.getRow(currentRow);
    totalRow.getCell('A').value = 'Total'; // Set "Total" label
    totalRow.getCell('C').value = {
      formula: `SUM(C2:C${currentRow - 1}) & "(g)"`,
      result: null, // Excel will compute this
    };
    totalRow.getCell('D').value = {
      formula: `SUM(D2:D${currentRow - 1})  & "(g)"`,
      result: null, // Excel will compute this
    };
    totalRow.getCell('E').value = {
      formula: `SUM(E2:E${currentRow - 1})  & "(g)"`,
      result: null,
    };
    totalRow.getCell('F').value = {
      formula: `SUM(F2:F${currentRow - 1})  & "(g)"`,
      result: null,
    };

    // Style the total row
    totalRow.eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };
    });
    // 파일을 버퍼로 저장
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }
}
