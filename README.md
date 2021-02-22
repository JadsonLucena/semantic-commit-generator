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