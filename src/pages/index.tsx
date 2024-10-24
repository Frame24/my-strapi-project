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
    socials
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
            />
        </RootLayout>
    );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const heroRes = await fetch(`http://localhost:1337/api/hero-sections?locale=${locale}&populate[0]=background_image&populate[1]=Button`);
    const heroSection = await heroRes.json();

    const studioRes = await fetch(`http://localhost:1337/api/studio-infos?locale=${locale}&populate[0]=Images&populate[1]=StudioComponents&populate[2]=StudioComponents.Icon`);
    const studioInfos = await studioRes.json();

    const priceRes = await fetch(`http://localhost:1337/api/price-lists?locale=${locale}&populate[0]=PriceList&populate[1]=ButtonOnline&populate[2]=ButtonWhatsAPP&populate[3]=Gallery`);
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
        },
    };
};