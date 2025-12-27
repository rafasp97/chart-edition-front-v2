import { createVuetify } from 'vuetify';
import { themes} from './theme.ts';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDateInput } from 'vuetify/labs/VDateInput';


export default createVuetify({
    components: {
        VDateInput,
        ...components
    },
    locale: {
        locale: 'pt-BR'
    },
    directives,
    icons: {
        defaultSet: 'mdi',
    },
    theme: {
        defaultTheme: 'light',
        themes
    }
})