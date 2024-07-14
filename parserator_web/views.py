import usaddress
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
# I didn't end up using ParseError
# from rest_framework.exceptions import ParsaeError


class Home(TemplateView):
    template_name = 'parserator_web/index.html'


class AddressParse(APIView):
    renderer_classes = [JSONRenderer]

    def get(self, request):
        # I'm passing in the input string as a request parameter
        input_string = request.query_params.get("input_string")

        try:
            address_components, address_type = self.parse(input_string)

            return Response({
                'input_string': input_string,
                'address_components': address_components,
                'address_type': address_type
            })

        except TypeError:
            return Response({'error': 'an unknown error occurred'}, status=400)
        except Exception as e:
            # Got to handle strings that cannot be parsed and return the error!
            return Response({'error': str(e.message.split('\n')[1].strip())}, status=400)

    def parse(self, address):
        # usaddress: https://github.com/datamade/usaddress
        address_components, address_type = usaddress.tag(address)
        return address_components, address_type
