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
        title: '사전평가',
        items: DOCS_ITEMS,
        theme: {
            timestamp: false,
            collapsed: true,
        }
    },
}