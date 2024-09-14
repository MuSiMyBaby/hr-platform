const fs = require('fs');
const path = require('path');

const rootPath = path.join(__dirname, '..', 'src');

function processDirectory(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      const filePath = path.join(directory, file);
      if (fs.statSync(filePath).isDirectory()) {
        if (file === 'entities') {
          console.log(`Processing directory: ${filePath}`);
          processEntities(filePath);
        } else {
          processDirectory(filePath);
        }
      }
    });
  });
}

function processEntities(entitiesDir) {
  fs.readdir(entitiesDir, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      const filePath = path.join(entitiesDir, file);
      if (file.endsWith('.ts')) {
        console.log(`Reading file: ${filePath}`);
        fs.readFile(filePath, 'utf-8', (err, data) => {
          if (err) throw err;

          let updatedData = data;

          // 檢查是否已經有 DeleteDateColumn 的 import，這只針對 import 部分
          if (
            !updatedData.match(
              /import\s*{[^}]*\bDeleteDateColumn\b[^}]*}\s*from\s*'typeorm';/,
            )
          ) {
            if (updatedData.includes("from 'typeorm';")) {
              // 在已有的 'typeorm' import 語句中插入 DeleteDateColumn
              updatedData = updatedData.replace(
                /import\s*{([^}]+)}\s*from\s*'typeorm';/,
                (match, imports) => {
                  if (!imports.includes('DeleteDateColumn')) {
                    return `import {${imports}, DeleteDateColumn} from 'typeorm';`;
                  }
                  return match; // 如果已經有 DeleteDateColumn，則不做任何修改
                },
              );
              console.log(`Added DeleteDateColumn import to: ${filePath}`);
            } else {
              // 如果沒有找到 'typeorm' 的導入，手動添加整個 import
              updatedData =
                `import { DeleteDateColumn } from 'typeorm';\n` + updatedData;
              console.log(`Added full DeleteDateColumn import to: ${filePath}`);
            }
          } else {
            console.log(
              `DeleteDateColumn import already exists in: ${filePath}`,
            );
          }

          // 檢查是否已有 @DeleteDateColumn，這只針對實體內部裝飾器部分
          if (!updatedData.includes('@DeleteDateColumn')) {
            const match = updatedData.match(
              /@Entity\(\)\s+export\s+class\s+\w+/,
            );
            if (match) {
              updatedData = updatedData.replace(
                /(@PrimaryGeneratedColumn\(\)\s+[\w\W]+?;)/,
                `$1\n  @DeleteDateColumn({ nullable: true })\n  deletedAt: Date;\n`,
              );
              console.log(`Added @DeleteDateColumn to: ${filePath}`);
            } else {
              console.log(`@Entity not found in: ${filePath}`);
            }
          } else {
            console.log(`@DeleteDateColumn already exists in: ${filePath}`);
          }

          // 寫回更新後的文件
          if (updatedData !== data) {
            fs.writeFile(filePath, updatedData, 'utf8', (err) => {
              if (err) throw err;
              console.log(`Updated ${filePath}`);
            });
          }
        });
      }
    });
  });
}

processDirectory(rootPath);
