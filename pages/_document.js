import Document, { Html, Head, Main, NextScript } from "next/document";
import { GA_TRACKING_ID } from "@/lib/gtag";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8860537294647481"
            crossorigin="anonymous"
          ></script>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments)}
                            gtag('js', new Date());
                            gtag('config', '${GA_TRACKING_ID}', {
                              page_path: window.location.pathname,
                            });
                          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <ins
            class="adsbygoogle"
            style="display:block"
            data-ad-format="autorelaxed"
            data-ad-client="ca-pub-8860537294647481"
            data-ad-slot="6958470335"
          ></ins>
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </body>
      </Html>
    );
  }
}
