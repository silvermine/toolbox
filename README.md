# Silvermine Toolbox - TypeScript Types and Utilities

[![NPM Version](https://img.shields.io/npm/v/@silvermine/toolbox.svg)](https://www.npmjs.com/package/@silvermine/toolbox)
[![License](https://img.shields.io/github/license/silvermine/toolbox.svg)](./LICENSE)
[![Build Status](https://travis-ci.com/silvermine/toolbox.svg?branch=master)](https://travis-ci.com/silvermine/toolbox)
[![Coverage Status](https://coveralls.io/repos/github/silvermine/toolbox/badge.svg?branch=master)](https://coveralls.io/github/silvermine/toolbox?branch=master)
[![Dependency Status](https://david-dm.org/silvermine/toolbox.svg)](https://david-dm.org/silvermine/toolbox)
[![Dev Dependency Status](https://david-dm.org/silvermine/toolbox/dev-status.svg)](https://david-dm.org/silvermine/toolbox#info=devDependencies&view=table)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

## What?

A collection of common types, [type guards][type-guards], and utilities for our TypeScript
codebases.


## Why?

We found that in many TypeScript projects we needed some of the same basic constructs,
e.g. an object that had string keys and string values. These types are easy enough to
define in each project (e.g. `{ [k: string]: string }`), but then you might need a type
guard, too. And if you need a type guard, you need unit tests for that type guard. So, we
collect frequently-used types in this repo, and use this project in our other projects.

While we wanted to focus primarily on types, and we don't want this to become the "junk
drawer" of every tool we ever need, there was also the need for a few helper / utility
functions in our codebases. For example, in some codebases we don't want to use Underscore
or lodash because we only need one or two functions and can't afford the extra bloat of a
full-blown library comprised of mostly things we don't need; those functions will be
implemented in this toolbox. _This codebase is not a replacement for Underscore or
lodash_; it's primarily a collection of types and type guards, with a few additional
utilities sprinkled in.

More details about the specific types and utilities will be included at a later time when
we get a doc-build system integrated.


## License

This software is released under the MIT license. See [the license file](LICENSE) for more
details.


[type-guards]: https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types
