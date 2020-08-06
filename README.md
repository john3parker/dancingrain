# Project: Dancing Rain - documentation

This site is generated using Jekyll, so you'll need some to install some Ruby dependencies.

## Prerequisites

Maintaining your own site with Jekyll is easy and can be learned
quickly. At a minimum you will need to know a bit of

* Git
* Markdown
* Jekyll

More advanced usage is aided by knowledge of

* HTML
* CSS
* Bootstrap
* Liquid
* JavaScript

and others.

For writing and editing a site we recommend the following tools to be installed
at a minimum:

* [Git](https://git-scm.com/downloads)
* [Jekyll](https://jekyllrb.com/docs/installation/)
* Your preferred text editor or IDE

The Jekyll installation including all needed  can be achieved by using bundler:

```shell
cd my-team-site
gem install bundler
bundle install
```

## Running in local mode

You can generate and run the site in local mode for dev and testing.

```
bundle exec jekyll serve --host 0.0.0.0
```

## Resize images
```
find . -name "IMG*" | xargs --replace=file convert -resize 25% file file
```