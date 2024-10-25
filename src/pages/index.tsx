// pages/index.tsx

import { GetStaticProps } from 'next';
import RootLayout from '../components/RootLayout'; // Импортируем RootLayout
import Page from './page'; // Импортируем компонент Page

export default function IndexPage({
    heroSection,
    studioInfos,
    priceList,
    reviewSection,
    faq,
    blog,
    contact,
    bookingSection,
    socials,
    footer,
    navbar,
    heroImage,
    galleryImages,
    studioImages,
}) {
    const seoData = {
        title: 'Popnailscz - Маникюр и Педикюр в Праге',
        description: 'Popnailscz предлагает лучшие услуги маникюра и педикюра в Праге. Забронируйте ваш сеанс уже сегодня!',
        keywords: 'маникюр, педикюр, Прага, Popnailscz, студия красоты'
    };

    return (
        <RootLayout seoData={seoData}>
            <Page
                heroSection={heroSection}
                studioInfos={studioInfos}
                priceList={priceList}
                reviewSection={reviewSection}
                faq={faq}
                blog={blog}
                contact={contact}
                bookingSection={bookingSection}
                socials={socials}
                footer={footer}
                navbar={navbar}
                heroImage={heroImage}
                galleryImages={galleryImages}
                studioImages={studioImages}
            />
        </RootLayout>
    );
}

async function fetchWithRetry(url: string, options = {}, retries = 5, delay = 2000): Promise<Response> {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (response.ok) {
                return response;
            } else {
                console.error(`Ошибка запроса, попытка ${i + 1} из ${retries}`, response.status, response.statusText);
            }
        } catch (error) {
            console.error(`Ошибка при выполнении fetch, попытка ${i + 1} из ${retries}`, error);
        }
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    throw new Error(`Не удалось получить данные с ${url} после ${retries} попыток`);
}


export const getStaticProps: GetStaticProps = async ({ locale }) => {
    // Оригинальные API-запросы для получения текстовой информации
    const heroRes = await fetchWithRetry(`http://localhost:1337/api/hero-sections?locale=${locale}&populate[0]=Button`, {}, 20, 3000);

    if (!heroRes.ok) {
        console.error('Ошибка получения heroSection:', heroRes.status, heroRes.statusText);
        return {
            props: {},
            revalidate: 10,
        };
    }

    let heroSection: any;

    try {
        heroSection = await heroRes.json();
        if (!heroSection || !heroSection.data) {
            console.error('Ошибка: данные heroSection отсутствуют или не содержат "data"');
            return {
                props: {},
                revalidate: 10,
            };
        }
    } catch (error) {
        console.error('Ошибка при парсинге JSON heroSection:', error);
        return {
            props: {},
            revalidate: 10,
        };
    }

    const studioRes = await fetch(`http://localhost:1337/api/studio-infos?locale=${locale}&populate[0]=StudioComponents&populate[1]=StudioComponents.Icon`);
    const studioInfos = await studioRes.json();

    const priceRes = await fetch(`http://localhost:1337/api/price-lists?locale=${locale}&populate[0]=PriceList&populate[1]=ButtonOnline&populate[2]=ButtonWhatsAPP`);
    const priceList = await priceRes.json();

    const reviewSectionRes = await fetch(`http://localhost:1337/api/review-sections?locale=${locale}&populate[0]=Review&populate[1]=Button`);
    const reviewSection = await reviewSectionRes.json();

    const faqRes = await fetch(`http://localhost:1337/api/faqs?locale=${locale}&populate[0]=QA`);
    const faq = await faqRes.json();

    const blogRes = await fetch(`http://localhost:1337/api/blog-sections?locale=${locale}&populate[0]=Blog`);
    const blog = await blogRes.json();

    const contactRes = await fetch(`http://localhost:1337/api/contacts?locale=${locale}&populate[0]=Contact`);
    const contact = await contactRes.json();

    const bookingRes = await fetch(`http://localhost:1337/api/booking-sections?locale=${locale}&populate[0]=Button`);
    const bookingSection = await bookingRes.json();

    const socialsRes = await fetch(`http://localhost:1337/api/socials?locale=${locale}&populate=*`);
    const socials = await socialsRes.json();

    const footerRes = await fetch(`http://localhost:1337/api/footers?locale=${locale}`);
    const footer = await footerRes.json();

    const navbarRes = await fetch(`http://localhost:1337/api/navbars?locale=${locale}`);
    const navbar = await navbarRes.json();

    // Новые API-запросы для получения изображений
    const heroImageRes = await fetch(`http://localhost:1337/api/first-section-background?locale=${locale}&populate=*`);
    const heroImage = await heroImageRes.json();

    const galleryRes = await fetch(`http://localhost:1337/api/gallery-of-work?locale=${locale}&populate=*`);
    const galleryImages = await galleryRes.json();

    const studioImageRes = await fetch(`http://localhost:1337/api/studio?locale=${locale}&populate=*`);
    const studioImages = await studioImageRes.json();

    return {
        props: {
            heroSection,
            studioInfos,
            priceList,
            reviewSection,
            faq,
            blog,
            contact,
            bookingSection,
            socials,
            footer,
            navbar,
            // Добавляем изображения в props
            heroImage,
            galleryImages,
            studioImages,
        },
    };
};
