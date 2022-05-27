import { ConsoleLogger, Injectable } from '@nestjs/common';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  HttpLink,
} from '@apollo/client';
import fetch from 'cross-fetch';

const GET_Specific_VEHICLES = gql`
  query FindSpecificVehicles($age: Int!) {
    findSpecificVehicles(age: $age) {
      id
      first_name
      last_name
      email
      car_make
      car_model
      vin_number
      manufactured_date
      age_of_vehicle
    }
  }
`;

const CREATE_VEHICLE = gql`
  mutation CreateVehicles($input: [VehiclePackInput!]!) {
    createVehicles(input: $input) {
      id
      first_name
      last_name
      email
      car_make
      car_model
      vin_number
      manufactured_date
    }
  }
`;

const client = new ApolloClient({
  uri: 'http://localhost:3003/graphql',
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
  link: new HttpLink({ uri: 'http://localhost:3003/graphql', fetch }),
  credentials: 'include',
});

@Injectable()
export class VehiclesService {
  async fetchSpecificVehicles(age: number) {
    const results = await client.query({
      query: GET_Specific_VEHICLES,
      variables: {
        age: age,
      },
    });

    //console.log(results['data']['findSpecificVehicles']);
    return results['data']['findSpecificVehicles'];
  }

  async saveRecoards(vehicles: any) {
    const results = await client.mutate({
      mutation: CREATE_VEHICLE,
      variables: {
        input: vehicles,
      },
    });
  }

  trailFunc() {
    console.log('Call service function');
  }
}
