import axios from 'axios';
import type { LastFmPeriod } from '../enums/EPeriodLastFm';
import { toast } from "vue3-toastify";

export class ApiService {

  private static baseUrl = 'https://charts-edition.onrender.com';


  static async getCharts(
    group?: string | null,
    body?: { users?: string[]; period?: LastFmPeriod }
  ) {
    try {
      const response = await axios.post(
        this.baseUrl,
        body,
        { params: group ? { group } : {} }
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error('Ocorreu um erro no servidor. Tente novamente mais tarde!');
    }
  }

  static async generateImage(file: File, dto: { charts: any; color: string }) {
    try {
      const formData = new FormData();
      formData.append('image', file);

      Object.keys(dto).forEach(key => {
        formData.append(key, dto[key as keyof typeof dto]);
      });

      const response = await axios.post(this.baseUrl, formData, {
        responseType: 'blob', 
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const blob = response.data;
      const blobUrl = URL.createObjectURL(blob);

      window.open(blobUrl, '_blank');
      setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);

    } catch (error) {
      console.log(error);
      toast.error('Erro ao gerar o resultado.');
    }
  }



}
