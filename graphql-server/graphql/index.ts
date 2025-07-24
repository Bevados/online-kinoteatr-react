import { movieTypeDefs } from './schema/movieSchema'
import { serialTypeDefs } from './schema/serialSchema'
import { channelTypeDefs } from './schema/channelSchema'
import { movieResolvers } from './resolvers/movieResolvers'
import { serialResolvers } from './resolvers/serialResolvers'
import { channelResolvers } from './resolvers/channelResolvers'

export const typeDefs = [movieTypeDefs, serialTypeDefs, channelTypeDefs]
export const resolvers = [movieResolvers, serialResolvers, channelResolvers]
