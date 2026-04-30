---
description: Create a git commit with semantic format
---

# Commit Command

## Allowed Commands
1. `git status --short`
2. `git diff --staged`
3. `git diff`
4. `git log --oneline -5`
5. `git add .`
6. `git commit -m "<message>"`

## Special Rule for .claude/settings.local.json
If `.claude/settings.local.json` was modified during the process and is not staged after `git add .`, run `git add .` again before committing to ensure it's included.

## Forbidden
- Do not run `find`, `dir`, `ls`, or any file exploration commands
- Do not run `cd` to other directories
- Do not check project structure outside the allowed Git commands
- Do not run commands other than the allowed Git commands above
- Do not run `git push`
- Do not use `--no-verify`
- Do not amend commits
- Do not force push
- Do not revert existing changes
- Do not add `Co-Authored-By` or trailers

## Security Rule

If the provided context mentions sensitive files or data such as:
- `.env`
- tokens
- credentials
- private keys
- certificates
- secrets
- production configs

Stop and ask before committing.

## Commit Message Format

type: subject line describing the main change (max 72 chars)

- Specific change or file added/modified with brief explanation
- Another specific change with context
- Additional changes as needed

## Types

feat, fix, docs, style, refactor, perf, test, chore

## Rules

1. Subject must be in imperative mood (Add, Create, Update, Fix)
2. Subject must not end with a period
3. Subject must be maximum 72 characters
4. Body bullets must start with a past tense verb (Added, Updated, Fixed, Refactored)
5. Be specific when context allows it
6. Do not invent changes that were not provided in the context
7. Inspect staged and unstaged changes with the allowed Git commands before committing
8. If there is still not enough context after inspection, ask for a summary before committing
