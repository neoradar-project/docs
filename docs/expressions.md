---
slug: /systems/expressions
sidebar_position: 1
---

# Expressions and Rules System

## Overview

The Expressions and Rules system provides a powerful way to implement custom logic throughout the application. It enables dynamic behavior for aircraft display, tag formatting, and target symbology based on various flight conditions, controller data, and more.

This system consists of two primary components:

1. **Expressions**: Logical conditions that evaluate to true or false
2. **Rules**: Expressions paired with a value to return when the expression evaluates to true

## Schema

Expressions and rules are defined in JSON or YAML format according to the following schema:

```json
{
  "expressions": {
    "expression_name": <expression>,
    ...
  },
  "rules": {
    "rule_name": {
      "expression": <expression> or [<expression_reference>, ...],
      "value": <value>
    },
    ...
  }
}
```

## Expressions

Expressions are defined as arrays that represent a logical operation or comparison. The first element is always the operator, followed by the operands.

### Basic Comparisons

Basic comparisons take the form:

```
[<operator>, <variable>, <value>]
```

For example:
```json
["==", "altitude", 10000]
```

This checks if the altitude is equal to 10000 feet.

#### Available Comparison Operators

| Operator | Description |
|----------|-------------|
| `==` | Equality |
| `!=` | Inequality |
| `<` | Less than |
| `<=` | Less than or equal to |
| `>` | Greater than |
| `>=` | Greater than or equal to |
| `beginsWith` | String begins with |
| `endsWith` | String ends with |
| `contains` | String contains |

### String Operations

Special string operations:

```
[<operator>, <string_check_type>, <variable>]
```

For example:
```json
["notEmpty", "scratchpad"]
```

This checks if the scratchpad has text in it.

#### Available String Operators

| Operator | Description |
|----------|-------------|
| `notEmpty` | Checks if a variable has a non-empty value |
| `isEmpty` | Checks if a variable is empty or zero |

### Logical Operations

Logical operations take the form:

```
[<logical_operator>, [<expression1>, <expression2>, ...]]
```

For example:
```json
["AND", [
  ["==", "altitude", 10000],
  ["==", "groundSpeed", 250]
]]
```

This checks if BOTH the altitude is 10000 AND the ground speed is 250.

#### Available Logical Operators

| Operator | Description |
|----------|-------------|
| `AND` | All expressions must be true |
| `OR` | At least one expression must be true |
| `NOT` | Inverts the result of the expression |

### Referenced Expressions

You can reference other expressions by name using a string starting with `$`:

```json
"expressions": {
  "is_high_altitude": [">", "altitude", 30000],
  "is_fast": [">", "groundSpeed", 450],
  "is_high_and_fast": ["AND", ["$is_high_altitude", "$is_fast"]]
}
```

This creates a reusable `is_high_and_fast` expression that references two other expressions.

### Working with References and Complex Logic

You can build complex logic by combining references and nested expressions:

```json
"is_valid_arrival": ["AND", [
  ["==", "isArrival", 1],
  ["NOT", [
    ["isEmpty", "callsign"]
  ]],
  ["OR", [
    ["==", "groundStatus", "TAXI"],
    ["==", "groundStatus", "DEPA"]
  ]]
]]
```

## Available Variables

The expressions system can access variables from several sources:

### Aircraft Position Data
- `altitude` - Aircraft altitude
- `agl` - Height above ground level
- `groundSpeed` - Ground speed in knots
- `reportedHeading` - Aircraft heading as reported
- `trackHeading` - Track heading (computed)
- `verticalSpeed` - Vertical speed in feet per minute
- `verticalTrend` - Vertical trend (UP/DOWN/LEVEL)
- `stopped` - Whether the aircraft is stopped
- `onGround` - Whether the aircraft is on the ground
- `timestamp` - Time of the last position update
- `transponder` - Transponder code
- `latLon` - Latitude/Longitude
- `trueAltitude` - True altitude
- `pressureAltitude` - Pressure altitude

### Aircraft Data
- `callsign` - Aircraft callsign
- `type` - Aircraft type
- `isTimingOut` - Whether the aircraft track is about to time out
- `lastPositionUpdateReceivedAt` - Time of last position update
- `squawk` - Transponder squawk code
- `latestTransponderStatus` - Status of the transponder

### Flight Plan Data
- `flightRule` - Flight rules (IFR/VFR)
- `rawType` - Raw aircraft type
- `icaoTransponderEquipment` - ICAO transponder equipment code
- `icaoEquipment` - ICAO equipment code
- `icaoWakeCategory` - ICAO wake category
- `acShortType` - Short aircraft type
- `origin` - Origin airport
- `destination` - Destination airport
- `alternate` - Alternate airport
- `plannedTas` - Planned true airspeed
- `plannedFlightLevel` - Planned flight level
- `rmk` - Remarks
- `flightTimeHours` - Flight time hours
- `flightTimeMinutes` - Flight time minutes
- `fuelTimeHours` - Fuel time hours
- `fuelTimeMinutes` - Fuel time minutes
- `eobt` - Estimated off-block time
- `aobt` - Actual off-block time
- `isValid` - Whether the flight plan is valid
- `voiceType` - Voice type

### Flight Plan Route
- `sid` - Standard Instrument Departure
- `star` - Standard Terminal Arrival Route
- `isAmended` - Whether the route has been amended
- `depRunway` - Departure runway
- `arrRunway` - Arrival runway
- `rawRoute` - Raw route string
- `hadStar` - Whether the route had a STAR
- `hadSid` - Whether the route had a SID

### Controller Data
- `clearedFlightLevel` - Cleared flight level
- `assignedHeading` - Assigned heading
- `assignedSpeed` - Assigned speed
- `assignedMach` - Assigned Mach number
- `assignedVerticalRate` - Assigned vertical rate
- `clearanceIssued` - Whether clearance has been issued
- `assignedSquawk` - Assigned squawk code
- `ownedByMe` - Whether the aircraft is owned by the current controller
- `ownedByCallsign` - Callsign of the controller that owns the aircraft
- `scratchpad` - Scratchpad content
- `groundStatus` - Ground status
- `clearanceQueuePosition` - Position in the clearance queue
- `attentionState` - Attention state

### Computed Data
- `isArrival` - Whether the aircraft is arriving at one of the active airports
- `isDeparture` - Whether the aircraft is departing from one of the active airports
- `isMyArrival` - Whether the aircraft is arriving at my airport
- `isMyDeparture` - Whether the aircraft is departing from my airport
- `suggestedStar` - Suggested STAR based on routing
- `suggestedSid` - Suggested SID based on routing
- `suggestedDepRunway` - Suggested departure runway
- `suggestedArrRunway` - Suggested arrival runway
- `myCallsign` - Current controller's callsign
- `ownedByID` - ID of the controller that owns the aircraft
- `computedSpeed` - Computed speed display
- `computedCFL` - Computed cleared flight level display

## Rules

Rules combine expressions with values to return when the expression evaluates to true. This allows for dynamic values in tags, colors, and display properties.

### Basic Rules

A basic rule consists of an expression and a value:

```json
"rules": {
  "warning_color": {
    "expression": ["<", "verticalSpeed", -2000],
    "value": "255,0,0"
  }
}
```

This returns the color red (255,0,0) when the vertical speed is less than -2000 feet per minute.

### Multiple Condition Rules

Rules can include an array of expressions, which are evaluated in order. The first expression that evaluates to true will determine the returned value:

```json
"flight_level_color": {
  "expression": [
    ["<", "altitude", 10000],
    ["<", "altitude", 20000],
    [">=", "altitude", 20000]
  ],
  "value": "0,0,255"
}
```

### Dynamic Values in Rules

Rules can return dynamic values by referencing variables. These are prefixed with `&`:

```json
"display_assigned_altitude": {
  "expression": ["notEmpty", "clearedFlightLevel"],
  "value": "&clearedFlightLevel"
}
```

This returns the actual cleared flight level when one has been assigned.

## Using Expressions and Rules in Configuration

### Tag Items

Tag items can reference rules for their values and style properties:

```json
{
  "itemName": "text",
  "value": ["=warning_text", "=normal_text"],
  "color": ["=warning_color", "=normal_color"],
  "fontSize": "=size_rule"
}
```

### Target Symbology

Target symbols can use expressions to determine when they should be applied:

```json
{
  "applyWhen": ["AND", [
    ["==", "onGround", 1],
    ["<", "groundSpeed", 5]
  ]],
  "symbol": "parked_aircraft"
}
```

### Colors and Style Properties

Style properties like colors can reference rules:

```json
"speedVectorColor": "=speed_vector_color_rule"
```

## Examples

### Example 1: Flight Level Formatting

```json
"expressions": {
  "is_low_altitude": ["<", "altitude", 10000],
  "is_medium_altitude": ["AND", [
    [">=", "altitude", 10000],
    ["<", "altitude", 20000]
  ]],
  "is_high_altitude": [">=", "altitude", 20000]
},
"rules": {
  "altitude_color": {
    "expression": ["$is_low_altitude", "$is_medium_altitude", "$is_high_altitude"],
    "value": "255,0,0"
  },
  "altitude_format": {
    "expression": ["$is_low_altitude"],
    "value": "&altitude"
  }
}
```

### Example 2: Attention State Rules

```json
"expressions": {
  "needs_attention": ["OR", [
    ["==", "attentionState", "kWarning"],
    ["==", "attentionState", "kEmergency"]
  ]]
},
"rules": {
  "callsign_color": {
    "expression": "$needs_attention",
    "value": "255,255,0"
  }
}
```

### Example 3: Ground Movement

```json
"expressions": {
  "is_on_ground": ["==", "onGround", 1],
  "is_taxiing": ["AND", [
    ["$is_on_ground"],
    [">", "groundSpeed", 5],
    ["<", "groundSpeed", 30]
  ]],
  "is_taking_off": ["AND", [
    ["$is_on_ground"],
    [">=", "groundSpeed", 30]
  ]]
},
"rules": {
  "ground_status_text": {
    "expression": ["$is_taxiing", "$is_taking_off"],
    "value": "TAXI"
  }
}
```

## Tips and Best Practices

1. **Name expressions clearly**: Use descriptive names like `is_on_approach` rather than generic names.
2. **Break down complex logic**: Create smaller expressions and combine them using references.
3. **Validate your expressions**: Ensure that they're properly formatted according to the schema.
4. **Test edge cases**: Consider what happens when data is missing or unexpected.
5. **Use common expressions**: Define expressions once and reference them multiple times.
6. **Create fallback rules**: Ensure there's always a valid value for every condition.
7. **Order matters**: In multi-condition rules, expressions are evaluated in the order they appear.
8. **Avoid deep nesting**: Too many nested expressions can be hard to read and maintain.

## Troubleshooting

### Common Issues

1. **Expression never evaluates to true**: Check that variables exist and have the expected values.
2. **Rule returns unexpected value**: Verify that expressions are being evaluated in the correct order.
3. **Reference error**: Ensure that all referenced expressions (`$expression_name`) exist.
4. **Syntax error**: Validate your JSON/YAML against the schema.

### Debugging Approaches

1. **Start simple**: Test basic expressions before combining them.
2. **Check the logs**: Look for error messages from the expressions engine.
3. **Use test values**: Create expressions with known outcomes to verify behavior.
4. **Inspect variable values**: Add temporary rules to display variable values.