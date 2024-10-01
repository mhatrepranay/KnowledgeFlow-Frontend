// pages/_document.js

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    {/* Add Google Translate Element */}
                    <div id="google_translate_element"></div>
                    {/* Load Google Translate Script */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                function googleTranslateElementInit() {
                  new google.translate.TranslateElement(
                    { pageLanguage: 'en' },
                    'google_translate_element'
                  );
                }
              `,
                        }}
                    />
                    <script
                        type="text/javascript"
                        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
                        async
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
