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

Variables
=========

Three variables are injected `ltr` and `rtl` which will be set to true or false and `dir` which will be set to `rtl` or `ltr`.

Property Reversing
==================

To be more in control of properties that get reversed, you can specify property directives
 
```
.test {
    -ltr-padding: 0; // rule only appears in LTR
    -rtl-margin: 3px; // rule only appears in RTL
    -ltr-rtl-float: left; // rule does not get reversed in either direction if autoReverse is on
    -rtl-ltr-float: left; // rule does not get reversed in either direction if autoReverse is on
    -ltr-reverse-text-align: left; // rule gets reversed for LTR, so in this case RTL = left, LTR = right
    -rtl-reverse-text-align: left; // rule gets reversed for RTL, so in this case RTL = right, LTR = left
}
```

Note: The reverse rules only make sense if autoreverse is off.

And this produces in RTL..
```
.test {
    margin: 3px;
    float: left;
    float: left;
    text-align: left;
    text-align: right;
}
```

and in LTR...
```
.test {
    padding: 0;
    float: left;
    float: left;
    text-align: right;
    text-align: left;
}
```

CLI Options
===========

```bash
$ lessc --rtl="dir=LTR auto-reverse=false vars=false" file.less out.css
```

auto-reverse
------------

Whether rules should be auto reversed or require property directives as above. Defaults to true.

vars
----

Whether the variables should be available. Defaults to true.

dir
---

The intended direction. Defaults to RTL.

Programmatic Options
====================

As above, but use `dir`, `vars` and `autoReverse` on the options object.
