#!/bin/bash

echo "🔧 Merging Prisma schema..."

MERGED="prisma/merged-schema.prisma"
> "$MERGED"  # 清空 merged 檔案

# ✅ 只加入 schema.prisma 前 10 行（通常是 generator + datasource）
head -n 10 prisma/schema.prisma >> "$MERGED"

# ✅ 加入 enums（使用 .part 避免 IDE 誤判）
cat prisma/enums.prisma.part >> "$MERGED"

# ✅ 加入所有 model（建議全改為 .prisma.part）
for file in prisma/models/*.prisma.part; do
  echo "// File: $file" >> "$MERGED"
  cat "$file" >> "$MERGED"
done

echo "✅ Schema merged to $MERGED"
echo "🎯 Running prisma generate..."

npx prisma generate --schema="$MERGED"
