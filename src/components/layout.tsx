import Head from 'next/head';
import localFont from 'next/font/local';
import './';

// Подключаем шрифты
const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900'
})
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900'
})

// SEO компонент для работы с мета-данными
function SEO({ title, description, keywords }: { title: string, description: string, keywords: string }) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content="index, follow" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content="https://popnailscz.example.com/og-image.jpg" />
            <meta property="og:url" content="https://popnailscz.cz" />
            <meta name="twitter:card" content="summary_large_image" />
        </Head>
    );
}

export default function RootLayout({
    children,
    seoData
}: Readonly<{
    children: React.ReactNode,
    seoData: {
        title: string,
        description: string,
        keywords: string
    }
}>) {
    return (
        <html lang='cs'>
            <SEO title={seoData.title} description={seoData.description} keywords={seoData.keywords} />
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children} {/* Контент страниц будет вставлен здесь */}
            </body>
        </html>
    )
}
