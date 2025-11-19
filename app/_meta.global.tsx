import {MetaRecord} from "nextra";

const DOCS_ITEMS: MetaRecord = {
    index: '',
    further_process: '',
}


export default {
    index: {
        type: 'page',
        theme: {
            layout: 'full',
            toc: false,
            timestamp: false,
        }
    },
    docs: {
        type: 'page',
        title: 'Check-in',
        items: DOCS_ITEMS,
        theme: {
            timestamp: false,
            collapsed: true,
        }
    },
}