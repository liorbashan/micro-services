import { Country } from './../entity/Country';
import { Continent } from './../entity/Continent';
import { IGraphqlService } from '../interfaces/IGraphqlService';
import ApolloClient, { PresetConfig, gql } from 'apollo-boost';
import { Service } from 'typedi';
import 'cross-fetch/polyfill';

@Service()
export class GraphqlService implements IGraphqlService {
    public _client: any;
    private endpoint: string = process.env.GRAPHQL_ENDPOINT || 'http://countries.trevorblades.com/';
    private clientOptions: PresetConfig = {
        uri: this.endpoint,
    };

    constructor() {
        this._client = new ApolloClient(this.clientOptions);
    }
    public async getAllContinents(): Promise<Continent[]> {
        let result: Continent[] = [];
        const gqlResult = await this._client
            .query({
                query: gql`
                    {
                        continents {
                            name
                            code
                        }
                    }
                `,
                fetchPolicy: 'no-cache',
            })
            .catch((error) => {
                console.log(error);
            });
        if (gqlResult) {
            console.log('continent list retrieved from API!');
            result = gqlResult.data;
        }
        return result;
    }
    public async getAllContinentCountries(continentCode: string): Promise<Country[]> {
        let result: Country[] = [];
        continentCode = continentCode.toUpperCase();
        const QUERY = gql`
            query getContinentCountries($continentCode: String) {
                countries(filter: { continent: { eq: $continentCode } }) {
                    code
                    name
                    phone
                    capital
                    currency
                    languages {
                        name
                    }
                }
            }
        `;
        const gqlResult = await this._client
            .query({
                query: QUERY,
                variables: {
                    continentCode,
                },
                fetchPolicy: 'no-cache',
            })
            .catch((error) => {
                console.log(error);
            });
        if (gqlResult) {
            console.log('countries list retrieved from API!');
            result = gqlResult.data;
        }
        return result;
    }
}
