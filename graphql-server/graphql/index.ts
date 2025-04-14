import { movieTypeDefs } from './schema/movieSchema'
import { serialTypeDefs } from './schema/serialSchema'
import { movieResolvers } from './resolvers/movieResolvers'
import { serialResolvers } from './resolvers/serialResolvers'

export const typeDefs = [movieTypeDefs, serialTypeDefs]
export const resolvers = [movieResolvers, serialResolvers]
