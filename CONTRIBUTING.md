# Contributing

Thanks for choosing to contribute to Paprika 🌶!

You will find here a set of guidelines to follow when contributing to this project.

## Have A Question?

Start by filing an issue. The existing committers on this project work to reach consensus around project direction and issue solutions within issue threads (when appropriate).

## Automated Release

### Release
Releases are automated and based on [Angular Commit Message Conventions in commits](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit-message-header).

The commit messages are used to build:
  * Release notes
  * Changelog updates
  * NPM package semver

### Commit Message Format
We have very precise rules over how the Git commit messages must be formatted. This format leads to a easier read of the commit history.

Each commit message consists of a header, a body, and a footer. Each must conform to the formats explained below.

```
<header>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

#### Commit Message Header
Mandatory.
```
<type>(<scope>): <short summary>
│       │             │
│       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
│       │
│       └─⫸ Commit Scope (optional): config|tween|easing|changelog
│
└─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test
```

#### Commit Message Body

Optional. Use the imperative, present tense. It must be at least 20 characters long

Explain the motivation for the change. This commit message should explain why you are making the change.

#### Commit Message Footer

Optional. The footer can contain information about breaking changes and deprecations, and reference to GitHub issues, Jira tickets, and other PRs that this commit closes or is related to. For example:

```
BREAKING CHANGE: <breaking change summary>
<BLANK LINE>
<breaking change description + migration instructions>
<BLANK LINE>
<BLANK LINE>
Fixes #<issue number>
```

or

```
DEPRECATED: <what is deprecated>
<BLANK LINE>
<deprecation description + recommended update path>
<BLANK LINE>
<BLANK LINE>
Closes #<pr number>
```

Breaking Change section should start with the phrase "BREAKING CHANGE: " followed by a summary of the breaking change, a blank line, and a detailed description of the breaking change (with migration instructions).

**A Breaking Change will trigger a major release.**

A Deprecation section should start with "DEPRECATED: " followed by a short description of what is deprecated, a blank line, and a detailed description of the deprecation that also mentions the recommended update path.

## Code Reviews

All submissions should come in the form of pull requests and need to be reviewed by project committers. Please always open a related issue before creating a pull Request.  
Read [GitHub's pull request documentation](https://help.github.com/articles/about-pull-requests/) for more information on sending pull requests.