import { CCSSProps } from '@cryptic-css/core'
import { mediaQuery } from '@w11r/use-breakpoint'

type MediaQueryItem = [string, CCSSProps]
type MediaQueryItems = MediaQueryItem | MediaQueryItem[]

declare module '@cryptic-css/core' {
    interface CCSSProps {
        /**
         * # mediaQuery
         *
         * Helps you to apply CCSS rules based on screen sizes, and use query (@ based rules).
         *
         * @see https://ccss.dev/docs/api-and-packages/prop-mq
         */
        mq?: MediaQueryItems
        /**
         * # mediaQuery
         *
         * Helps you to apply CCSS rules based on screen sizes, and use query (@ based rules).
         *
         * @see https://ccss.dev/docs/api-and-packages/prop-mq
         */
        mediaQuery?: MediaQueryItems
        /**
         * # mediaQuery
         *
         * Helps you to apply CCSS rules based on screen sizes, and use query (@ based rules).
         *
         * @see https://ccss.dev/docs/api-and-packages/prop-mq
         */
        at?: MediaQueryItems
        /**
         * # mediaQuery
         *
         * Helps you to apply CCSS rules based on screen sizes, and use query (@ based rules).
         *
         * @see https://ccss.dev/docs/api-and-packages/prop-mq
         */
        media?: MediaQueryItems
    }
}

const handler = (input, prop, transformedFn): string => {
    if (typeof input[0] === 'string') {
        input = [input]
    }
    // We need new array references to avoid mutating the original src
    const generated: [string, {}][] = []
    for (let i = 0; i < input.length; i++) {
        generated[i] = [input[i][0], transformedFn(input[i][1])]
    }

    return mediaQuery(generated, transformedFn.outputTransformer.type) as string
}

const useProp = (transformedFn) => {
    transformedFn.setProps(
        ['mq', 'at', 'media', 'mediaQuery'].map((prop) => [
            [prop],
            null,
            [handler],
            { babelPluginHandler: 'deepCSSVars' }
        ])
    )
}

const x: CCSSProps = {}

export default useProp
