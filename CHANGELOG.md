# Changelog

All notable changes to this project will be documented in this file.
See [our coding standards][commit-messages] for commit guidelines.

## [0.7.0](https://github.com/silvermine/toolbox/compare/v0.6.0...v0.7.0) (2026-01-12)


### Features

* add isFunction helper ([6e79c52](https://github.com/silvermine/toolbox/commit/6e79c527f5b5a3203db34a69188c792dde840c9e))
* add JSON.stringify replacer to deterministically sort object keys ([da7cce7](https://github.com/silvermine/toolbox/commit/da7cce7711a8080e199c856a1016adfa4748458f))


### Bug Fixes

* resolve issues for Typescript version 5.7.2 ([83eef93](https://github.com/silvermine/toolbox/commit/83eef93c893d9af091aa29383235924818e3964e))


## [0.6.0](https://github.com/silvermine/toolbox/compare/v0.5.1...v0.6.0) (2025-11-12)


### Features

* add groupBy util ([e828ca8](https://github.com/silvermine/toolbox/commit/e828ca8f54e18b7513034cee12ec5eb4e5ed2159))


### [0.5.1](https://github.com/silvermine/toolbox/compare/v0.5.0...v0.5.1) (2025-11-08)


### Bug Fixes

* ensure hasDefined is called on an object ([e532ebf](https://github.com/silvermine/toolbox/commit/e532ebf571481d38a0a6d22890e08e18eba3f807))


## [0.5.0](https://github.com/silvermine/toolbox/compare/v0.4.0...v0.5.0) (2025-10-24)


### Features

* Make isEmpty a type guard ([#16](https://github.com/silvermine/toolbox/issues/16)) ([b324aec](https://github.com/silvermine/toolbox/commit/b324aec3c21484bb24e911e3daab5cea7814a4f7))
* Make isEmpty work for Sets ([#31](https://github.com/silvermine/toolbox/issues/31)) ([0bf3e39](https://github.com/silvermine/toolbox/commit/0bf3e3964ce80fc99e85ae2a07db8566da731e4d))


### Bug Fixes

* keep type info when checking for empty obj or array ([#114](https://github.com/silvermine/toolbox/issues/114)) ([4fe3bc0](https://github.com/silvermine/toolbox/commit/4fe3bc07660bad4a27168f5764522b4c1d4c8e18))
* make hasDefined work for non-strict unions ([#107](https://github.com/silvermine/toolbox/issues/107)) ([34c6123](https://github.com/silvermine/toolbox/commit/34c6123198b967a374073aa362d5ba49d34233fb))
* replace isUndefined from node utils by our own implementation ([abcd9e0](https://github.com/silvermine/toolbox/commit/abcd9e0c11cface756562627b793a74886d47a0d))


## [0.4.0](https://github.com/silvermine/toolbox/compare/v0.3.0...v0.4.0) (2024-09-03)


### Features

* add _.compact replacement ([#35](https://github.com/silvermine/toolbox/issues/35)) ([39e08a5](https://github.com/silvermine/toolbox/commit/39e08a5e59f626ab713602bce8b645eeec2b94cf))
* Add isBoolean type guard ([#49](https://github.com/silvermine/toolbox/issues/49)) ([e8b208c](https://github.com/silvermine/toolbox/commit/e8b208cf7d66eb6c49a53db6757a98b311c278dc))
* Add isSet type guard ([#31](https://github.com/silvermine/toolbox/issues/31)) ([ad25a69](https://github.com/silvermine/toolbox/commit/ad25a69ebc86efe58ca37289b5892ac35dff82e9))
* add range function ([#42](https://github.com/silvermine/toolbox/issues/42)) ([a2ae666](https://github.com/silvermine/toolbox/commit/a2ae6663ba1afb08c98671812e27500c5099b3db))


### Bug Fixes

* Replace `any` arg types in type guards w/ `unknown` ([48aac51](https://github.com/silvermine/toolbox/commit/48aac51fb71584b24f8126dbd1e3a43868a97227))


## [0.3.0](https://github.com/silvermine/toolbox/compare/v0.2.0...v0.3.0) (2024-05-06)


### Features

* add partial replacement of _.pick ([c7d143e](https://github.com/silvermine/toolbox/commit/c7d143e05867d2785de60ca4141aefb62361ac35))
* add replacement of _.uniq ([#23](https://github.com/silvermine/toolbox/issues/23)) ([4ece381](https://github.com/silvermine/toolbox/commit/4ece3819757dd2dbb354ad42bb496844a9cda67a))
* add StrictUnion ([22080e1](https://github.com/silvermine/toolbox/commit/22080e1b590b8c5ace25f544366a0807b355a27e))

### Other

* config: allow tslib 2.x as peer dep ([6320e11](https://github.com/silvermine/toolbox/commit/6320e11110deeb66008a58b0090e8dde6214cc11))


[commit-messages]: https://github.com/silvermine/silvermine-info/blob/master/commit-history.md#commit-messages
