# NPM Repository


[![GitHub tag](https://img.shields.io/github/tag/waitingsong/npm-base.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![](https://img.shields.io/badge/lang-TypeScript-blue.svg)]()
[![ci](https://github.com/waitingsong/npm-base/actions/workflows/nodejs.yml/badge.svg
)](https://github.com/waitingsong/npm-base/actions)
[![codecov](https://codecov.io/github/waitingsong/npm-base/graph/badge.svg?token=JGnpuA7GCL)](https://codecov.io/github/waitingsong/npm-base)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)


以下所有命令行操作都在 `git-bash` 窗口中执行

## Install global deps for development
```sh
npm i -g c8 madge rollup tsx zx
```

## 创建新项目

### 克隆新项目仓库

```sh
git clone git@git.foo.com:<group>/<project> && cd <project>
# 比如
git clone git@git.foo.com:foo/uc && cd uc
```

### 初始化仓库

```sh
# GitLab
git archive --remote=git@github.com:waitingsong/npm-base.git HEAD package.json | tar -x > package.json
# GitHub
curl -kL https://github.com/waitingsong/npm-base/raw/main/package.json > package.json
git add package.json
git commit -m "chore: initialize"
npm run bp:add
npm run bp:sync-force

# 初始化依赖
npm install
```


---

## License
[MIT](LICENSE)

<br>

