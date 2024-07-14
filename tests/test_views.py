import pytest


def test_api_parse_succeeds(client):
    # Send a request to the API and confirm that the
    # data comes back in the appropriate format.



def test_api_parse_raises_error(client):
    # The address_string below will raise a RepeatedLabelError,
    # so ParseAddress.parse() should not be able to parse it.
