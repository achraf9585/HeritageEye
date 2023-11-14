import { StrictMode } from "react";

import i18n from "locales";

import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

interface MyDocumentProps {
  locale: string;
}

function MyDocument(props: MyDocumentProps) {
  i18n.changeLanguage(props.locale || "fr");

  return (
    <StrictMode>
      <Html dir={props.locale === "ar" ? "rtl" : "ltr"} lang={props.locale}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    </StrictMode>
  );
}

export async function getInitialProps(ctx: DocumentContext) {
  const initialProps = await Document.getInitialProps(ctx);

  return { ...initialProps, locale: ctx?.locale || "fr" };
}

MyDocument.getInitialProps = getInitialProps;

export default MyDocument;
