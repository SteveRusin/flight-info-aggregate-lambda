Feature: Ability to fetch data
  Scenario: Should remove duplicate data from datasources
    Given datasources returns duplicate data
    When lambda is invoked
    Then database should contain uniq data

