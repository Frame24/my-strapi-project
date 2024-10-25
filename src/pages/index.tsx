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

async function fetchWithRetry(url: string, options = {}, retries = 5, delay = 2000): Promise<any> {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (response.ok) {
                return response.json(); // сразу возвращаем JSON объект
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
    const fetchData = async (url: string) => {
        try {
            const data = await fetchWithRetry(url, {}, 5, 2000);
            if (!data || !data.data) {
                console.error(`Ошибка: данные от ${url} отсутствуют или не содержат "data"`);
                return null;
            }
            return data;
        } catch (error) {
            console.error(`Ошибка получения данных от ${url}:`, error);
            return null;
        }
    };

    // Оригинальные API-запросы для получения текстовой информации
    const heroSection = await fetchData(`http://localhost:1337/api/hero-sections?locale=${locale}&populate[0]=Button`);
    const studioInfos = await fetchData(`http://localhost:1337/api/studio-infos?locale=${locale}&populate[0]=StudioComponents&populate[1]=StudioComponents.Icon`);
    const priceList = await fetchData(`http://localhost:1337/api/price-lists?locale=${locale}&populate[0]=PriceList&populate[1]=ButtonOnline&populate[2]=ButtonWhatsAPP`);
    const reviewSection = await fetchData(`http://localhost:1337/api/review-sections?locale=${locale}&populate[0]=Review&populate[1]=Button`);
    const faq = await fetchData(`http://localhost:1337/api/faqs?locale=${locale}&populate[0]=QA`);
    const blog = await fetchData(`http://localhost:1337/api/blog-sections?locale=${locale}&populate[0]=Blog`);
    const contact = await fetchData(`http://localhost:1337/api/contacts?locale=${locale}&populate[0]=Contact`);
    const bookingSection = await fetchData(`http://localhost:1337/api/booking-sections?locale=${locale}&populate[0]=Button`);
    const socials = await fetchData(`http://localhost:1337/api/socials?locale=${locale}&populate=*`);
    const footer = await fetchData(`http://localhost:1337/api/footers?locale=${locale}`);
    const navbar = await fetchData(`http://localhost:1337/api/navbars?locale=${locale}`);
    const heroImage = await fetchData(`http://localhost:1337/api/first-section-background?locale=${locale}&populate=*`);
    const galleryImages = await fetchData(`http://localhost:1337/api/gallery-of-work?locale=${locale}&populate=*`);
    const studioImages = await fetchData(`http://localhost:1337/api/studio?locale=${locale}&populate=*`);

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
        revalidate: 10,
    };
};
