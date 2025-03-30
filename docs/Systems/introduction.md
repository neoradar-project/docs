---
slug: /systems/introduction
sidebar_position: 1
---

# What is a system?

## Intro

A system is a set of configuration that describes how the HMI looks. Comparing it to EuroScope, it is a combination of Symbology, Tag definitions and some of the General settings.

You can create as many systems as you like, which allows to simulate various ATM systems. Each profile has a system, and you can freely switch between profile, triggering a switch of the system.

Each system contains:

- Labels configuration (labels.[json/yaml])
- Targets configuration (targets.[yaml/json])
- Map style override (mapstyle.[yaml/json])

The systems folder also contains the following two files which are shared across all systems:

- Expressions (expressions.[json/yaml])
- Lists (lists.[json/yaml])

## Formatting of the files

You can freely use JSON or YAML, the system will automatically parse and pick it up based on file extension.

You should use the provided schemas, that will allow you to autocomplete and find all available properties. You should always validate your files against a JSON or YAML parser, and using the provided schemas. NeoRadar has strong validation and will yell at you if the format is wrong and refuse to load the files.

The schemas are available here: https://github.com/neoradar-project/schemas

## Breaking down the types

Each system allows you to define behaviour, tags, and symbology for airborned AND ground targets separately, so you do not need two systems to have your "vSMR" and your airborned view.

For ground targets, you can define label variances for arrivals, departures and other.

For airborne targets, you can define label variances for unconcerned, concerned, and detailed
