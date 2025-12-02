# language: en
Feature: A Sample Feature to demonstrate Behave

  @e2e
  Scenario: Google search
  Given Raj is on the Google search page
  When he searches for "Test Pyramid"
  Then he sees search results related to "Test Pyramid" 
  # This will mostly fail due to google bot detection