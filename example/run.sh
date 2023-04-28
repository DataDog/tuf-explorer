# assuming the current directory to be the root of the "TUF Explorer" repository

export TUF_EXPLORER_ROOT_DIR=$PWD
export TUF_EXPLORER_REPOS_ROOT_DIR_SUFFIX=example/tuf-repo
export TUF_EXPLORER_REPOS_KEY_INFO_DIR_SUFFIX=example/keyinfo

npm run dev
