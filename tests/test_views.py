# I got a lint error that pytest is imported but never used...
# keeping this import statement here for testing anyway
import pytest
from django.urls import reverse
import json


def test_api_parse_succeeds(client):
    # Send a request to the API and confirm that the
    # data comes back in the appropriate format.
    address_string = '123 main st chicago il'
    url = reverse('address-parse')
    url += '?input_string=' + address_string

    correct_format = {
        "input_string": "123 main st chicago il",
        "address_components":
            {
                "AddressNumber": "123",
                "StreetName": "main",
                "StreetNamePostType": "st",
                "PlaceName": "chicago",
                "StateName": "il"
            },
            "address_type": "Street Address"
        }

    response = client.get(url)
    address_data = json.loads(response.content)

    assert response.status_code == 200
    assert address_data == correct_format


def test_api_parse_raises_error(client):
    # The address_string below will raise a RepeatedLabelError,
    # so ParseAddress.parse() should not be able to parse it.
    address_string = '123 main st chicago il 123 main st'
    url = reverse('address-parse')
    url += '?input_string=' + address_string

    # Check for repeated label error
    # note: eslint doesn't like the long line below, but test will not register
    # equal json structure if I split the string up into two lines
    correct_error_returned = {
        'error':
        'ERROR: Unable to tag this string because more than one area of the string has the same label'
    }

    response = client.get(url)
    response_data = json.loads(response.content)
    assert response.status_code == 400
    assert response_data == correct_error_returned
