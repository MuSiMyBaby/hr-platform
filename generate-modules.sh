#!/bin/bash

# 模組名稱列表
modules=("education" "language" "work" "skills" "certifications" "personality-traits" "transportation" "work-schedule" "employment-status" "job-type" "emergency-contacts" "personal-statements" "portfolios" "photos")

# 迭代模組名稱並生成模組
for module in "${modules[@]}"
do
  echo "Generating module: $module"
  nest generate resource $module --no-spec
done
