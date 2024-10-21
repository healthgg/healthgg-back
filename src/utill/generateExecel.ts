import * as ExcelJS from 'exceljs';

export async function generateVolumeExcel(data) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');

  if (Object.keys(data[0])[0].includes('fitness')) {
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
      const col = columns[i];

      worksheet.getCell(`${col}1`).value = data[i].fitness_machine_name;
      worksheet.getCell(`${col}2`).value = data[i].repetition;
      worksheet.getCell(`${col}3`).value = data[i].set;
      worksheet.getCell(`${col}4`).value = data[i].weight;
      worksheet.getCell(`${col}5`).value = `${data[i].total_weight} (kg)`;
    }
  }

  // 모든 셀 가운데 정렬 및 스타일 적용
  worksheet.eachRow((row) => {
    row.eachCell((cell) => {
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };
      cell.font = {
        size: 12,
      };
    });
  });

  // 제목 열의 스타일 적용
  worksheet.getColumn(1).eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '6385ff' }, // 배경색 파랑
    };
    cell.font = {
      color: { argb: 'FFFFFFFF' }, // 글자색 흰색
      bold: true,
      size: 12,
    };
    cell.alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
  });

  // A열 폰트 크기 설정

  // 모든 셀 텍스트 크기에 맞게 열 너비 자동 조정
  worksheet.columns.forEach((column) => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const cellValue = cell.value;
      let cellLength = 0;

      if (typeof cellValue === 'string') {
        cellLength = cellValue.length;
      } else if (typeof cellValue === 'number') {
        cellLength = cellValue.toString().length;
      } else if (cellValue instanceof Date) {
        cellLength = cellValue.toLocaleString().length;
      } else {
        cellLength = 10; // 기본값
      }

      if (cellLength > maxLength) {
        maxLength = cellLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength + 2; // 최소 너비 10으로 설정
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
      { header: '지방 (g)', key: 'fat', width: 20 },
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

    // 제목 열의 스타일 적용
    worksheet.getRow(1).eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '6385ff' }, // 배경색 #6385ff
      };
      cell.font = {
        color: { argb: 'FFFFFFFF' }, // 글자색 흰색
        bold: true,
        size: 12,
      };
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };
    });

    const totalRow = worksheet.getRow(currentRow);
    totalRow.getCell('A').value = 'Total';
    totalRow.getCell('C').value = {
      formula: `SUM(C2:C${currentRow - 1})`,
      result: null,
    };
    totalRow.getCell('D').value = {
      formula: `SUM(D2:D${currentRow - 1})`,
      result: null,
    };
    totalRow.getCell('E').value = {
      formula: `SUM(E2:E${currentRow - 1})`,
      result: null,
    };
    totalRow.getCell('F').value = {
      formula: `SUM(F2:F${currentRow - 1})`,
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

    // 모든 셀 가운데 정렬 및 중앙 정렬, 높이 설정
    worksheet.eachRow((row, rowNumber) => {
      row.height = 25; // 행 높이 설정 (필요에 따라 조정)
      row.eachCell((cell) => {
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
      });
    });

    // 셀 너비 자동 조정
    worksheet.columns.forEach((column) => {
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const cellLength = cell.value ? cell.value.toString().length : 10;
        if (cellLength > maxLength) {
          maxLength = cellLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength + 2;
    });

    // 파일을 버퍼로 저장
    const buffer = await workbook.xlsx.writeBuffer();

    return buffer;
  }
}
