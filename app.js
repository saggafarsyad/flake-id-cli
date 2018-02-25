#!/usr/bin/env node

'use strict'

// Import dependecies
const intformat = require('biguint-format')
const FlakeId = require('flake-idgen')

// Constants
const DEFAULT_NODE_ID = 1
const DEFAULT_COUNT = 10

// Init snowflake generator instance
let generator = new FlakeId({datacenter: DEFAULT_NODE_ID})

/**
 * Generate new Twitter Snowflake ID
 * 
 * @returns {string} Generated ID
 */
let newId = () => {
  return intformat(generator.next(), 'dec')
}

/**
 * Get no of ID to be generated from cli arguments
 * 
 * @param {number} defaultValue Fallback value
 * @return {number} No of ID to be generated
 */
let getCount = defaultValue => {
  let args = process.argv
  // If value not specified, return default value
  if (args.length < 3) {
    return defaultValue
  }
  // Get argument value
  let val = args[2]  
  // If value less than 0, return fallback value
  if (val < 0)
    val = defaultValue
  // Return first value
  return val
}

/** 
 * Main app script
 */
let main = () => {
  // Get no of ID to be generated
  let count = getCount(DEFAULT_COUNT)
  // Show output
  console.log("Flake ID Generator")
  console.log("------------------")
  console.log("No of ID will be generated: %d\n", count)
  for (let i = 0; i < count; i++) {
    console.log(newId())
  }
  // Exit process
  process.exit(0)
}

// Call main
main()