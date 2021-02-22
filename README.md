# Semantic Commit Generator

A practical generator for creating standardized semantic commits.

This project can be appreciated in: https://jadsonlucena.github.io/semantic-commit-generator/

Semantic commit is a good practice that seeks to instruct how to create well-formed commits messages.\
This facilitates the analysis of the project log by another team member or by automated tools.

Each commit must be atomic. As one of the foundations of continuous integration (CI), this methodology provides that each new functionality or change is always available and properly documented, with this, errors can be detected in advance.\
The commit message must be in the present imperative. This tells someone what the commit application will do, instead of what you did.


## Commit Message Format

```
<header>
<BLANK LINE>
[optional body]
<BLANK LINE>
[optional footer(s)]
```

- The confirmation message header cannot exceed the 50 character limit!
- If there are any technical details that cannot be expressed in these strict size restrictions, place them on the body.
- The footer must contain the necessary references and details of changes that cause interruption, if any.


## Commit Message Header

```
<type>[optional scope][optional !]: <short summary>
  │          │              |              │
  │          │              |              └─⫸ Summary in present tense. Not capitalized. No period at the end
  │          │              |
  |          |              └─⫸ The exclamation mark must be used to draw attention to significant changes
  |          |
  │          └─⫸ Describes a section of the code base that provides additional contextual information
  │
  └─⫸ Commit Type: build|ci|chore|docs|feat|fix|improvement|perf|refactor|revert|style|test|other
```


## Reverter

This type of commit differs between conventional commits and contribution to Angular, however, we chose the example of conventional commits because we understand that the model adopted has greater freedom without compromising simplicity.\
The SHA hash of the commit being rolled back must be reported in Refs.