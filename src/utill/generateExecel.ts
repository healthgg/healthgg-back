import * as ExcelJS from 'exceljs';

export async function generateVolumeExcel(data) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');

  console.log(data);
  if (Object.keys(data[0])[0].includes('fitness')) {
    worksheet.columns = [
      { header: '운동기구', width: 20 },
      { header: '반복 횟수', width: 20 },
      { header: '세트 수', width: 20 },
      { header: '중량', width: 20 },
      { header: '총 중량', width: 20 },
    ];

    data.forEach((item) => {
      worksheet.addRow({
        fitness_machine_name: item.fitness_machine_name,
        repetition: item.repetition,
        set: item.set,
        weight: item.weight,
        total_weight: item.total_weight,
      });
    });
  }

  worksheet.getRow(1).eachCell((cell) => {
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

  if (data.morning) {
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

// export async function generateFoodExcel(data) {
//   // 새로운 워크북 생성
//   const workbook = new ExcelJS.Workbook();

//   // 새 워크시트 추가
//   const worksheet = workbook.addWorksheet('식단');

//   // 헤더 추가
//   worksheet.columns = [
//     { header: '', key: 'meal', width: 10 },
//     { header: '음식이름', key: 'food', width: 20 },
//     { header: '칼로리(kcal)', key: 'calories', width: 15 },
//     { header: '단백질(g)', key: 'protein', width: 15 },
//     { header: '탄수화물(g)', key: 'carbs', width: 15 },
//     { header: '지방(g)', key: 'fat', width: 10 },
//   ];

//   // 식사 데이터
//   const mealData = {
//     아침: [
//       {
//         food: '고구마 (100g)',
//         calories: 86,
//         protein: 1.6,
//         carbs: 20.1,
//         fat: 0.1,
//       },
//       {
//         food: '현미밥 (100g)',
//         calories: 123,
//         protein: 2.7,
//         carbs: 25.6,
//         fat: 1,
//       },
//       {
//         food: '사과 (100g)',
//         calories: 52,
//         protein: 0.3,
//         carbs: 13.8,
//         fat: 0.2,
//       },
//       { food: '우유 (50ml)', calories: 30, protein: 1.6, carbs: 2.4, fat: 1.5 },
//     ],
//     점심: [
//       {
//         food: '고구마 (100g)',
//         calories: 86,
//         protein: 1.6,
//         carbs: 20.1,
//         fat: 0.1,
//       },
//       {
//         food: '현미밥 (100g)',
//         calories: 123,
//         protein: 2.7,
//         carbs: 25.6,
//         fat: 1,
//       },
//       {
//         food: '사과 (100g)',
//         calories: 52,
//         protein: 0.3,
//         carbs: 13.8,
//         fat: 0.2,
//       },
//       { food: '우유 (50ml)', calories: 30, protein: 1.6, carbs: 2.4, fat: 1.5 },
//     ],
//     저녁: [
//       {
//         food: '고구마(100g)',
//         calories: 86,
//         protein: 1.6,
//         carbs: 20.1,
//         fat: 0.1,
//       },
//       {
//         food: '현미밥(100g)',
//         calories: 123,
//         protein: 2.7,
//         carbs: 25.6,
//         fat: 1,
//       },
//       {
//         food: '사과 (100g)',
//         calories: 52,
//         protein: 0.3,
//         carbs: 13.8,
//         fat: 0.2,
//       },
//       { food: '우유 (50ml)', calories: 30, protein: 1.6, carbs: 2.4, fat: 1.5 },
//     ],
//   };

//   let totalCalories = 0,
//     totalProtein = 0,
//     totalCarbs = 0,
//     totalFat = 0;

//   // 데이터 추가 및 셀 병합
//   let currentRow = 1;
//   for (const [meal, foods] of Object.entries(mealData)) {
//     const startRow = currentRow;

//     for (const food of foods) {
//       worksheet.addRow({
//         meal: meal,
//         ...food,
//       });

//       totalCalories += food.calories;
//       totalProtein += food.protein;
//       totalCarbs += food.carbs;
//       totalFat += food.fat;

//       currentRow++;
//     }

//     // 각 섹션의 셀 병합
//     worksheet.mergeCells(`A${startRow}:A${currentRow - 1}`);
//     worksheet.getCell(`A${startRow}`).alignment = {
//       vertical: 'middle',
//       horizontal: 'center',
//     };

//     currentRow++;
//   }

//   // 총섭취량 추가
//   worksheet.mergeCells(`A${currentRow}:B${currentRow}`);
//   worksheet.getCell(`A${currentRow}`).value = '총섭취량';
//   worksheet.getCell(`A${currentRow}`).alignment = { horizontal: 'right' };

//   worksheet.getCell(`C${currentRow}`).value = `${totalCalories}kcal`;
//   worksheet.getCell(`D${currentRow}`).value = `${totalProtein}g`;
//   worksheet.getCell(`E${currentRow}`).value = `${totalCarbs}g`;
//   worksheet.getCell(`F${currentRow}`).value = `${totalFat}g`;

//   // 스타일링 (선택 사항)
//   worksheet.eachRow((row, rowNumber) => {
//     row.eachCell((cell, colNumber) => {
//       cell.border = {
//         top: { style: 'thin' },
//         left: { style: 'thin' },
//         bottom: { style: 'thin' },
//         right: { style: 'thin' },
//       };
//     });
//   });

//   const buffer = await workbook.xlsx.writeBuffer();
//   return buffer;
// }
