<div>

[![license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/tnez/workd/blob/master/LICENSE)
[![npm package](https://img.shields.io/npm/v/workd/latest.svg)](https://npmjs.com/package/workd)

</div>

---

`workd` (pronounced worked) is an application to set and keep track of the working directory per desktop so that applications like terminals and test runners can reference the current working directory to enhance their workflows.

_YMMV Disclaimer: this software has not been used enough in the wild to thoroughly test. It is young and beautiful, but quite immature. Your Mileage May Vary_ 😛

### Installing

This is a node package that you can install globally via `npm` or `yarn`.

```sh
npm install --global @tnesland/workd
```

### Usage

`workd` does only two things:

1. Allows you to set a working directory, optionally associating it with a workspace / desktop.

```sh
workd set /home/some-user/Projects/some-project-dir

# or with a workspace
workd set /home/some-user/Projects/another-project-dir --space 1
```

2. Allows you to retrieve the working directory that was previously set.

```sh
workd get   # > /home/Projects/some-project-dir
workd get 1 # > /home/Projects/another-project-dir
```

If no directory has been previously set, either for the default or for a given workspace, the user's home directory is returned.
