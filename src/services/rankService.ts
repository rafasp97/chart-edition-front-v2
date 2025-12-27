import axios from 'axios';
import type { Artist } from '../interfaces/Artist';
import utils from '../utils/utils';
import { LastFmPeriod } from '../enums/EPeriodLastFm';
import FirestoreService from './fireStoreService';

const users: string[] = [
    'iraaaph', 
    'guswlima', 
    'piscixxx', 
    'erikbzra', 
    'candygor', 
    'llucasmoreno5', 
    'brunocosta061', 
    'akumakoji', 
    'becamusics',
    'Edu_XS',
    'felipetas',
    'vitoriaforttes'
];

export const rankService = {

    async getDATA(customUsers?: string[], selectedPeriod?: LastFmPeriod){
      const artists: Artist[] = [];
      for(const user of customUsers || users){
        const data = await this.infoLastFM(user, selectedPeriod);

        for(const artist of  data.topartists.artist){
          artists.push({
            name: artist.name,
            playcount: artist.playcount
          });
        }
      }
      
      const noRepeat = utils.noRepeat(artists);

      const rank = utils.getRank(noRepeat);
      const firebase = await FirestoreService.getLastRankByGroup("group editions");
      console.log(firebase);
      return rank;
    },

    async infoLastFM(user:string, period: LastFmPeriod = LastFmPeriod.SevenDays){
        try{
            const response = await axios.post(`https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${user}&api_key=7d6a2403de46005e4c8b90419196d615&period=${period}&format=json`);
            return response.data;
        } catch(error){
            throw new Error(`Erro: ${error}`);
        }
    }
};
