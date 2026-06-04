# PreToolUse guard for AI agents (Claude Code) working in this repo.
# Reads the pending tool call as JSON on stdin and:
#   1. DENIES destructive remote git operations outright
#      (force-push, --mirror, remote branch deletion, repo deletion)
#   2. Forces an explicit user-approval prompt for ANY `git push`
# Regexes scan the whole command string, so flags are caught in any position,
# including inside compound commands (e.g. "Set-Location x; git push --force").
$json = [Console]::In.ReadToEnd()
try { $cmd = ($json | ConvertFrom-Json).tool_input.command } catch { exit 0 }
if (-not $cmd) { exit 0 }

$destructive = 'git[^|;&]*push[^|;&]*(--force|--mirror|--delete|\s-f(\s|$))|git[^|;&]*push[^|;&]*\s:\S|gh[^|;&]*repo\s+delete'
if ($cmd -match $destructive) {
  '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Blocked by project policy: force-push, remote branch deletion, and repo deletion are not allowed in this repo."}}'
  exit 0
}

if ($cmd -match 'git[^|;&]*push') {
  '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"ask","permissionDecisionReason":"Project policy: git push always requires explicit user approval."}}'
  exit 0
}

exit 0
