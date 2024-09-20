#! /bin/bash

dirName=.

if [ "$1" = "help" ]
then
    echo "UTILITIES FOR DEVELOPMENT"
    echo ""
    echo "./run.sh npm"
    echo "Used to run npm install for adding new libraries. It doesn't delete anything."
    echo ""
    echo "./run.sh clean"
    echo "Used to delete all dependencies (node_modules) and reinstall them."
    echo ""
    echo "./run.sh feature <HU-[story or task number]-[feature-name]>"
    echo "Used to generate a new branch for a new development."
    echo ""
    echo "./run.sh merge"
    echo "Used to bring all changes from master to the current branch without automatic push."
    echo ""
fi

if [ "$1" = "npm" ]
then
  npm i --force
fi

if [ "$1" = "clean" ]
then
  rm -Rf node_modules
  rm package-lock.json
  npm i --force
fi

if [ "$1" = "feature" ]
then
  git stash save "new-feature"
  git fetch
  git checkout develop
  git pull
  git checkout -b "feature/$2"
  git branch
  git stash pop
  git add .
  git commit -m "First commit- branch $2"
  git push --set-upstream origin "feature/$2"
fi

if [ "$1" = "merge" ]
then
  branch_name="$(git branch --show-current)"
  echo Merge branch develop to $branch_name...
  git push --no-verify
  git fetch
  git checkout develop
  git pull
  git checkout $branch_name
  git merge develop --no-commit --no-ff
fi

if [ "$1" = "pr" ]
then
  branch_name="$(git branch --show-current)"
  echo Pull request to branch develop from $branch_name...
  gh pr create --base develop --title "$2" --body "Review $branch_name"
fi

if [ "$1" = "docker" ]
then
  docker build -t heggar/loyaltywall-frontend-admin . 
fi
