# 对整个项目进行完整的类型检查
TS_CHANGED=$(git diff --cached --numstat --diff-filter=ACM | grep -F '.ts' | wc -l)
if [ "$TS_CHANGED" -gt 0 ]
then
  echo '正在检查 TypeScript 类型，请稍候。。。'
  tsc -p . --skipLibCheck --noEmit || exit 1
  echo 'TypeScript 类型检查通过'
  echo '正在检查代码风格，请稍后。。。'
  npm run lint || exit 1
fi
