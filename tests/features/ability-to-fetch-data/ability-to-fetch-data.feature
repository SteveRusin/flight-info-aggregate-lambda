Feature: Ability to fetch data
  Scenario: Should concat data from 2 datasources
    Given datasources returns uniq records
    When lambda is invoked
    Then database should contain 2 records

  Scenario: Should remove duplicate data from datasources
    Given datasources returns duplicate data
    When lambda is invoked
    Then database should contain 2 records

