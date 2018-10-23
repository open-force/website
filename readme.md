# Open Force

This repository contains all the code which drives the open-force website.  It is split into two projects:

1. `org`: A salesforce dx project which contains the metadata for the sfdc backend

2. `website`: a nodejs backend with `react` SPA front end

More details on each can be found in the project level readme.md.

## getting started

1. clone down
2. run `git submodule init` & `git submodule update` to load org submodules
3. run `cd org` & `./build` to generate a new scratch org from source. `cd ..` back to root when done
4. `cd website`.  follow readme instructions on starting site