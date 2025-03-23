# Targets

## What is it?

This configuration allows you to define different visual representations for aircraft based on their characteristics, status, and attention states. You can pretty much have as many variants as you want, and create complex logic for how the targets and trails look like.

## Configuration Structure

The configuration file is structured with the following main sections:

- **$schema**: Reference to the JSON schema that validates the structure of this file
- **groundSymbology**: Defines the appearance of aircraft on the ground
- **airborneSymbology**: Defines the appearance of aircraft in the air

This configuration works in conjunction with the Expressions system, which provides powerful conditional logic for determining when specific symbology should be applied. For detailed information on the expression syntax, see the Expressions documentation.

## Ground Symbology

Ground symbology is divided into three categories:

### 1. Default Ground Symbology

Applied to aircraft on the ground that don't match specific arrival or departure conditions. Each entry in this array specifies a display rule that applies to aircraft matching certain conditions. Rules are evaluated in order, and the first matching rule is applied.

```json
"default": [
  {
    "id": "ground_default_cdg",
    "plotImage": "cdg_white_assumed_t3",
    "applyWhen": "",
    "historyTrailImages": [
      "cdg_white_assumed_t6",
      "cdg_white_assumed_t6",
      "cdg_white_assumed_t6"
    ]
  }
]
```

### 2. Departure Ground Symbology

Applied to departing aircraft on the ground.

```json
"departure": [
  {
    "id": "ground_departure_cdg",
    "plotImage": "cdg_white_assumed_t3",
    "applyWhen": "",
    "historyTrailImages": [
      "cdg_white_assumed_t6",
      "cdg_white_assumed_t6",
      "cdg_white_assumed_t6"
    ]
  }
]
```

### 3. Arrival Ground Symbology

Applied to arriving aircraft on the ground.

```json
"arrival": [
  {
    "id": "ground_arrival_cdg",
    "plotImage": "cdg_white_assumed_t3",
    "applyWhen": "",
    "historyTrailImages": [
      "cdg_white_assumed_t6",
      "cdg_white_assumed_t6",
      "cdg_white_assumed_t6"
    ]
  }
]
```

## Airborne Symbology

The `airborneSymbology` section defines the appearance of aircraft in the air. Each entry in this array specifies a display rule that applies to aircraft matching certain conditions. Rules are evaluated in order, and the first matching rule is applied.

Example rule:

```json
{
  "id": "assumed_issy_helico",
  "description": "issy helico avec code 4217",
  "applyWhen": ["==", "squawk", "4217"],
  "applyToAttentionStates": ["kAssumed"],
  "plotImage": "cdg_white_assumed_aircraft",
  "historyTrailsSkipSteps": 5,
  "historyTrailImages": [
    "cdg_white_assumed_t1",
    "cdg_white_assumed_t2",
    "cdg_white_assumed_t3",
    "cdg_white_assumed_t4",
    "cdg_white_assumed_t5",
    "cdg_white_assumed_t6"
  ]
}
```

## Configuration Properties

### Common Properties

The following properties can be used in both ground and airborne symbology rules:

Here's the table by itself for easy copying:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `description` | String | No | Human-readable description of what the rule applies to |
| `applyWhen` | Expression | No | Condition that determines when the rule applies |
| `applyToAttentionStates` | Array | No | List of attention states this rule applies to |
| `plotImage` | String | Yes | Sprite reference image used to display the aircraft |
| `historyTrailImages` | Array | No | Sprite reference images used for history trail points |
| `historyTrailsSkipSteps` | Number | No | Number of radar updates to skip between history trail points |
| `rotatePlotWithHeading` | Boolean | No | Whether to rotate the aircraft symbol based on heading |
| `rotateHistoryTrailWithHeading` | Boolean | No | Whether to rotate history trail symbols based on heading |
| `speedVectorColor` | Array/String | No | Color of the speed vector |vector                                    |     |

### Condition Expressions (`applyWhen`)

The `applyWhen` property accepts expressions that determine when a specific symbology rule should be applied to an aircraft. The expression system used here is the same as described in the Expressions documentation. Apply when accepts the following

- **Reference to an Expression**: Example `["$isVFR"]`
- **Simple Comparison**: Example: `["==", "squawk", "4217"]`
- **Logical Operations**: Example: `["OR", ["$isArr", "$isParisGroupArrival"]]`

For a complete guide to expressions, including all available operators, variables, and complex expression building, refer to the Expressions documentation.

### Attention States

The `applyToAttentionStates` property specifies which attention states the rule applies to:

- `kUnconcerned`: Aircraft not of current interest
- `kNotified`: Aircraft that have been notified
- `kIncomingTransfer`: Aircraft being transferred to you
- `kAssumed`: Aircraft under the controller's responsibility
- `kOutgoingTransfer`: Aircraft being transferred to another controller
- `kIntruder`: Aircraft identified as an intruder

## Customization Examples

### 1. Adding a New Rule for Military Aircraft

```json
{
  "description": "Military aircraft",
  "applyWhen": ["beginsWith", "callsign", "CTM"],
  "plotImage": "military_symbol",
  "historyTrailsSkipSteps": 5,
  "historyTrailImages": [
    "military_trail_1",
    "military_trail_2",
    "military_trail_3",
    "military_trail_4",
    "military_trail_5",
    "military_trail_6"
  ]
}
```

### 2. Creating a Rule for High-Priority Aircraft

```json
{
  "description": "High priority aircraft",
  "applyWhen": [
    "OR",
    [
      ["==", "scratchpad", "PRIO"],
      ["contains", "callsign", "MEDEVAC"]
    ]
  ],
  "plotImage": "high_priority_symbol",
  "historyTrailsSkipSteps": 3,
  "historyTrailImages": [
    "priority_trail_1",
    "priority_trail_2",
    "priority_trail_3",
    "priority_trail_4"
  ]
}
```

### 3. Creating a catch all rule

```json
{
  "description": "Catch all",
  "plotImage": "default_plot",
  "historyTrailsSkipSteps": 5,
  "historyTrailImages": [
    "default_trail",
    "default_trail",
    "default_trail",
    "default_trail",
  ]
}
```

## Best Practices

1. **Order Matters**: Rules are evaluated in order, with the first match being applied. Place more specific rules before more general ones.

2. **Default Fallback**: Always include a default rule with an empty `applyWhen` string at the end of your list to catch aircraft that don't match any specific rule.

3. **Performance Optimization**: Minimize the use of complex logical expressions in `applyWhen` conditions for better performance.

4. **Consistent Visual Language**: Maintain a consistent color and symbol scheme to aid controller recognition and reduce cognitive load.

5. **Reuse Common Expressions**: Define frequently used conditions in your expressions configuration and reference them with the `$` prefix

## Schema Validation

The configuration file references a schema (`https://raw.githubusercontent.com/neoradar-project/schemas/refs/heads/main/systems/targets.schema.json`) that can be used to validate your configuration and ensure it follows the correct structure.
