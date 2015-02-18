[![NPM version](https://badge.fury.io/js/less-plugin-rtl.svg)](http://badge.fury.io/js/less-plugin-rtl) [![Dependencies](https://david-dm.org/less/less-plugin-rtl.svg)](https://david-dm.org/less/less-plugin-rtl) [![devDependency Status](https://david-dm.org/less/less-plugin-rtl/dev-status.svg)](https://david-dm.org/less/less-plugin-rtl#info=devDependencies) [![optionalDependency Status](https://david-dm.org/less/less-plugin-rtl/optional-status.svg)](https://david-dm.org/less/less-plugin-rtl#info=optionalDependencies)

less-plugin-rtl
===============

Reverses less from ltr to rtl

```less
.reverse {
  float: left;
  margin-left: 5px;
  margin: 1px 2px 3px 4px;
  & when (@rtl) {
    color: green;
  }
}
```

 Becomes...

```css
.reverse {
  float: right;
  margin-right: 5px;
  margin: 1px 4px 3px 2px;
  color: green;
}
```

To use with lessc

```bash
$ npm install -g less-plugin-rtl
$ lessc --rtl file.less out.css
```

and to run in LTR mode..

```bash
$ lessc --rtl="dir=LTR" file.less out.css
```