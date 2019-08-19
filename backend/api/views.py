from rest_framework import generics, status
from .serializers import ProjectShortSerializer, UserShortSerializer
from .models import Project, PUser, TopicsProject, DeliveryModeProject, ResearchInterestUser, AgeRangeUser, AgeRangeProject, DeliveryModeUser
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response


class Filter(generics.ListAPIView):
    def post(self, request, *args, **kwargs):

        if ('category' not in request.data) or (request.data['category'] == 'projects'):

            filtered_set = Project.objects.filter(isApproved=True)

            if 'q' in request.data and request.data['q'] != '':

                queries = request.data['q'].split()
                search_query_set = Project.objects.none()

                for query in queries:

                    search_filtered_set = Project.objects.filter(owner__first_name__icontains=query) \
                                    | Project.objects.filter(owner__last_name__icontains=query) \
                                    | Project.objects.filter(name__icontains=query) \
                                    | Project.objects.filter(summary__icontains=query)
                    search_query_set = search_filtered_set | search_query_set

                    topic_relationships = TopicsProject.objects.filter(researchTopic__icontains=query)
                    for relationship in topic_relationships:

                        search_filtered_set = search_filtered_set | Project.objects.filter(pk=relationship.project.pk)

                filtered_set = filtered_set & search_query_set

            if 'status' in request.data:
                filter_status_set = Project.objects.none()
                status_dict = {
                    'Completed': 1,
                    'In Progress': 2,
                    'Not Started': 3
                }

                status_params = request.data['status']
                if type(status_params) == str:
                    status_params = [status_params]

                for param in status_params:
                    filter_status_set = filter_status_set | Project.objects.filter(status=status_dict[param])

                filtered_set = filtered_set & filter_status_set

            if 'researchtopic' in request.data:
                filtered_researchtopic_set = Project.objects.none()
                research_topics = request.data['researchtopic']
                if type(research_topics) == str:
                    research_topics = [research_topics]

                for topic in research_topics:
                    if topic == 'Other':
                        researchTopics = ['Animal Science & Agriculture', 'Civic Engagement',
                                          'Diversity Equity & Inclusion', 'Education & Learning',
                                          'Environment & Sustainability', 'Families',
                                          'Health & Wellness', 'Peer Relationships',
                                          'Positive Youth Development', 'Policy Analysis',
                                          'Program Evaluation', 'Media & Technology',
                                          'Motivation', 'Nutrition', 'Risk Behavior',
                                          'Self & Identity', 'Science Technology Engineering & Math (STEM)',
                                          'Youth/Adult Relationships']
                        topic_relationships = TopicsProject.objects.exclude(researchTopic__in=researchTopics)
                        for topic_relationship in topic_relationships:
                            filtered_researchtopic_set = filtered_researchtopic_set | \
                                                         Project.objects.filter(pk=topic_relationship.project.pk)
                    else:
                        #get the projects that have a topic there
                        topic_relationships = TopicsProject.objects.filter(researchTopic=topic)
                        for topic_relationship in topic_relationships:
                            filtered_researchtopic_set = filtered_researchtopic_set |\
                                                         Project.objects.filter(pk=topic_relationship.project.pk)

                filtered_set = filtered_set & filtered_researchtopic_set

            if 'deliverymodes' in request.data:
                filtered_deliverymodes_set = Project.objects.none()


                delivery_modes = request.data['deliverymodes']
                if type(delivery_modes) == str:
                    delivery_modes = [delivery_modes]

                for mode in delivery_modes:

                    if mode == 'Other':
                        deliveryModes = ['Afterschool', 'Camps', 'Clubs']
                        delivery_relationships = DeliveryModeProject.objects.exclude(deliveryMode__in=deliveryModes)
                        for delivery_relationship in delivery_relationships:
                            filtered_deliverymodes_set = filtered_deliverymodes_set | \
                                                         Project.objects.filter(pk=delivery_relationship.project.pk)

                    else:
                        delivery_relationships = DeliveryModeProject.objects.filter(deliveryMode=mode)
                        for delivery_relationship in delivery_relationships:
                            filtered_deliverymodes_set = filtered_deliverymodes_set | \
                                                            Project.objects.filter(pk=delivery_relationship.project.pk)


                filtered_set = filtered_set & filtered_deliverymodes_set
            if 'ageranges' in request.data:
                filtered_ageranges_set = Project.objects.none()
                ageranges = request.data['ageranges']
                if type(ageranges) == str:
                    ageranges = [ageranges]
                for age in ageranges:
                    age_relationships = AgeRangeProject.objects.filter(ageRange=age)
                    for age_relationship in age_relationships:
                        filtered_ageranges_set = filtered_ageranges_set |\
                                                Project.objects.filter(pk=age_relationship.project.pk)

                filtered_set = filtered_set & filtered_ageranges_set

            serializer = ProjectShortSerializer(filtered_set, many=True)

            return Response(data=serializer.data, status=status.HTTP_200_OK)

        else:

            filtered_set = PUser.public_objects.all()

            if 'q' in request.data:

                queries = request.data['q'].split()

                search_query_set = PUser.public_objects.none()

                for query in queries:
                    search_filtered_set = PUser.public_objects.filter(first_name__icontains=query) \
                                          | PUser.public_objects.filter(last_name__icontains=query) \
                                          | PUser.public_objects.filter(researchDescription__icontains=query) \
                                          | PUser.public_objects.filter(researchNeeds__icontains=query) \
                                          | PUser.public_objects.filter(location__icontains=query) \
                                          | PUser.public_objects.filter(email__icontains=query)
                    interest_relationships = ResearchInterestUser.objects.filter(researchInterest__icontains=query)
                    for relationship in interest_relationships:
                        search_filtered_set = search_filtered_set | PUser.public_objects.filter(pk=relationship.user.pk)

                    search_query_set = search_query_set | search_filtered_set

                filtered_set = filtered_set & search_query_set

            if 'researchinterest' in request.data:

                filtered_researchinterest_set = PUser.public_objects.none()
                research_interests = request.data['researchinterest']
                if type(research_interests) == str:
                    research_interests = [research_interests]

                for interest in research_interests:

                    if interest == 'Other':
                        researchInterests = ['Animal Science & Agriculture', 'Civic Engagement',
                                          'Diversity Equity & Inclusion', 'Education & Learning',
                                          'Environment & Sustainability', 'Families',
                                          'Health & Wellness', 'Peer Relationships',
                                          'Positive Youth Development', 'Policy Analysis',
                                          'Program Evaluation', 'Media & Technology',
                                          'Motivation', 'Nutrition', 'Risk Behavior',
                                          'Self & Identity', 'Science Technology Engineering & Math (STEM)',
                                          'Youth/Adult Relationships']

                        interest_relationships = ResearchInterestUser.objects.exclude(researchInterest__in=researchInterests)
                        for relationship in interest_relationships:
                            filtered_researchinterest_set = filtered_researchinterest_set |\
                                                            PUser.public_objects.filter(pk=relationship.user.pk)

                    else:
                        interest_relationships = ResearchInterestUser.objects.filter(researchInterest=interest)
                        for relationship in interest_relationships:
                            filtered_researchinterest_set = filtered_researchinterest_set |\
                                                            PUser.public_objects.filter(pk=relationship.user.pk)


                filtered_set = filtered_set & filtered_researchinterest_set

            if 'location' in request.data:
                filtered_location_set = PUser.public_objects.none()
                locations = request.data['location']
                if type(locations) == str:
                    locations = [locations]
                for location in locations:
                    if location == 'Other':
                        location_options = [
                            'Albany County, NY', 'Allegany County, NY', 'Bronx County, NY','Broome County, NY',
                            'Cattaraugus County, NY', 'Cayuga County, NY', 'Chautauqua County, NY',
                            'Chemung County, NY', 'Chenango County, NY', 'Clinton County, NY', 'Columbia County, NY',
                            'Cortland County, NY', 'Delaware County, NY', 'Dutchess County, NY', 'Erie County, NY',
                            'Essex County, NY', 'Franklin County, NY', 'Fulton County, NY', 'Genesee County, NY',
                            'Greene County, NY', 'Hamilton County, NY', 'Herkimer County, NY', 'Jefferson County, NY',
                            'Kings (Brooklyn) County, NY', 'Lewis County, NY', 'Livingston County, NY', 'Madison County, NY',
                            'Monroe County, NY', 'Montgomery County, NY', 'Nassau County, NY', 'New York (Manhattan) County, NY',
                            'Niagara County, NY', 'Oneida County, NY', 'Onondaga County, NY', 'Ontario County, NY',
                            'Orange County, NY', 'Orleans County, NY', 'Oswego County, NY', 'Otsego County, NY',
                            'Putnam County, NY', 'Queens County, NY', 'Rensselaer County, NY',
                            'Richmond (Staten Island) County, NY', 'Rockland County, NY', 'Saint Lawrence County, NY',
                            'Saratoga County, NY', 'Schenectady County, NY', 'Schoharie County, NY', 'Schuyler County, NY',
                            'Seneca County, NY', 'Steuben County, NY', 'Suffolk County, NY', 'Sullivan County, NY',
                            'Tioga County, NY', 'Tompkins County, NY', 'Ulster County, NY', 'Warren County, NY',
                            'Washington County, NY', 'Wayne County, NY', 'Westchester County, NY', 'Wyoming County, NY',
                            'Yates County, NY'
                        ]
                        filtered_location_set = filtered_location_set |\
                                                    PUser.public_objects.exclude(location__in=location_options)

                    else:
                        location_formatted = location + ' County, NY'
                        filtered_location_set = filtered_location_set |\
                                                PUser.public_objects.filter(location=location_formatted)

                filtered_set = filtered_set & filtered_location_set

            if 'ageranges' in request.data:
                filtered_ageRanges_set = PUser.public_objects.none()
                ageRanges = request.data['ageranges']
                if type(ageRanges) == str:
                    ageRanges = [ageRanges]
                for agerange in ageRanges:
                    age_relationships = AgeRangeUser.objects.filter(ageRange=agerange)
                    for age_relationship in age_relationships:
                        filtered_ageRanges_set = filtered_ageRanges_set |\
                                                    PUser.public_objects.filter(pk=age_relationship.user.pk)

                filtered_set = filtered_set & filtered_ageRanges_set

            serializer = UserShortSerializer(filtered_set, many=True)

            return Response(data=serializer.data, status=status.HTTP_200_OK)
