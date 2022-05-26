[![Tests][gh-tc-shield]][gh-tc-url]
[![Code coverage][codecov-shield]][codecov-url]
[![Code quality][lgtm-shield]][lgtm-url]
[![GitHub tag][tag-shield]][tag-url]

# Yet Another TypeScript (project) Template

<img src=".docs/logo.svg" height="260px" align="right"/>

An opinionated template for TypeScript projects that includes, out of the box:

- Type-safe JS with __TypeScript__
- Fast transpilation with __SWC__
- Unit testing with __Jest__
- Code coverage on __Codecov__
- Container-ready with __Docker__
- Efficient dependency management with __pnpm__
- Good-looking API documentation with __TypeDoc__
- CI/CD pipeline on __GitHub Actions__ with:
    - Node modules caching for faster pipelines
    - Linting, style and code duplication checking
    - Test execution and coverage report upload
    - Docker image build and push to DockerHub

The API documentation live preview is available at [yatt.upsetbit.co][yatt-docs].

[yatt-docs]: https://yatt.upsetbit.co

[gh-tc-shield]: https://img.shields.io/github/workflow/status/caian-org/yatt/run-tests-and-upload-coverage?label=tests&logo=github&style=for-the-badge
[gh-tc-url]: https://github.com/caian-org/yatt/actions/workflows/test-with-cov.yml

[codecov-shield]: https://img.shields.io/codecov/c/github/caian-org/yatt.svg?logo=codecov&logoColor=FFF&style=for-the-badge
[codecov-url]: https://codecov.io/gh/caian-org/yatt

[lgtm-shield]: https://img.shields.io/lgtm/grade/javascript/g/caian-org/yatt.svg?logo=lgtm&style=for-the-badge
[lgtm-url]: https://lgtm.com/projects/g/caian-org/yatt/context:javascript

[docker-img-size-shield]: https://img.shields.io/docker/image-size/caian/yatt?sort=semver&logo=docker&logoColor=FFF&style=for-the-badge
[docker-url]: https://hub.docker.com/r/caian/yatt

[tag-shield]: https://img.shields.io/github/tag/caian-org/yatt.svg?logo=git&logoColor=FFF&style=for-the-badge
[tag-url]: https://github.com/caian-org/yatt/releases


## Compatibility

Any version `>= 14` should be okay: `yatt` is tested against the latest (minor/patch) versions of NodeJS 14, 15, 16, 17 and 18.


## How can I use it?

Take what suits you, ignore or change what you do not like, and apply according to his will.


## License

To the extent possible under law, [Caian Ertl][me] has waived __all copyright and related or neighboring rights to this
work__. In the spirit of _freedom of information_, I encourage you to fork, modify, change, share, or do whatever you
like with this project! [`^C ^V`][kopimi]

[![License][cc-shield]][cc-url]

[me]: https://github.com/upsetbit
[cc-shield]: https://forthebadge.com/images/badges/cc-0.svg
[cc-url]: http://creativecommons.org/publicdomain/zero/1.0

[kopimi]: https://kopimi.com
