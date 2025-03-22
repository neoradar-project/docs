---
slug: /introduction/bug-report
sidebar_position: 2
title: Bug Report Template
description: Template for reporting bugs and issues in NeoRadar Client
---

Please use this template when reporting bugs or issues with NeoRadar Client. Providing complete information helps us identify and fix problems more quickly.

:::tip Important
Before submitting a bug report, please check if someone else has already reported the same issue to avoid duplicates.
:::

## Basic Information

### Version Number

Enter your version number (found on the startup package loader screen). This is critical for tracking which version has the bug.

### Date and Time of Occurrence

Enter when the issue occurred as precisely as possible. This helps correlate with log entries.

### Operating System

Include your OS with its version number and any relevant specifics (e.g., 32/64-bit).

## Issue Description

### What were you doing?

Provide a detailed, step-by-step description of what you were doing when the issue occurred. Be specific and include:

- Which facility you were connected to
- What actions you were performing
- Any aircraft involved (if applicable)
- Any settings you had changed from default

### Expected Result

Describe exactly what you expected to happen based on normal operation.

### Actual Result

Describe exactly what happened instead. Include any error messages that appeared (copy/paste if possible).

### Reproducibility

Can you reproduce the issue consistently? Choose one and provide additional information:

- **Always Reproducible**: List the exact steps needed to reproduce the bug every time.
- **Sometimes Reproducible**: Describe any patterns you've noticed about when it occurs.
- **Happened Once**: Provide as much context as possible since it can't be reproduced on demand.

## Log Files

Please attach the following log files to your report:

- **fsd.log** - Contains connection information to the network
- **fdps.log** - Contains information related to the processing and handling of network data
- **client.log** - Contains general client operation logs
- **route-handler.log** - Contains route processing information

The log files can be found in the following directory:

- **Windows**: `C:\Users\[username]\Documents\NeoRadar\logs\`
- **macOS & Linux**: `~\Documents\NeoRadar\logs\`

### Relevant Timestamps

Provide approximate timestamps in the logs when the issue occurred. This helps us locate the relevant sections quickly.
For example: "Error occurred around 14:32:45 UTC in client.log"

## Additional Information

### Screenshots

If applicable, attach screenshots showing the issue. Ensure no personal or sensitive information is visible.
Suggestions for helpful screenshots:

- The error message dialog
- The radar display when the issue occurred
- Any relevant settings panels

### Additional Context

Any other information that might be relevant to the issue:

- Were you using any other software alongside NeoRadar?
- Is this a regression (something that worked before but doesn't now)?
- Have you found any workarounds?
- What controller position were you staffing?
- What was the traffic density at the time?
