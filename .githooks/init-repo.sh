#!/bin/bash
#
# 初始化 git 仓库
#
# Author: waiting
# Date: 2019.01.21
#
set -e

git init
git config --global i18n.commitencoding utf-8
git config --global core.autocrlf input
git config --global core.eol lf

if [ -z "$CI" ]; then
  git config core.filemode false
  git config core.hooksPath ./.githooks
  git config core.ignorecase false
  git config core.precomposeUnicode true
  git config fetch.prune true
  git config pull.rebase true
  git config push.autoSetupRemote true
  git config push.followTags true
  git config rebase.autoStash true
  git config remote.origin.prune true
  git config remote.origin.tagopt --tags
  git config remote.pushdefault origin
fi;

echo It may going for a long time. Plese wait...
.githooks/gen-file-from-example.mts

echo init done
