// pages/index.tsx

import { GetStaticProps } from 'next';
import RootLayout from '../components/RootLayout'; // Импортируем RootLayout
import Page from './page'; // Импортируем компонент Page

export default function IndexPage({
    studioInfos,
    priceList,
    reviews,
    faq,
    blog,
    contact
}) {
    const seoData = {
        title: 'Popnailscz - Маникюр и Педикюр в Праге',
        description: 'Popnailscz предлагает лучшие услуги маникюра и педикюра в Праге. Забронируйте ваш сеанс уже сегодня!',
        keywords: 'маникюр, педикюр, Прага, Popnailscz, студия красоты'
    };

    return (
        <RootLayout seoData={seoData}>
            <Page
                studioInfos={studioInfos}
                priceList={priceList}
                reviews={reviews}
                faq={faq}
                blog={blog}
                contact={contact}
            />
        </RootLayout>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const studioRes = await fetch('http://localhost:1337/api/studioinfos');
    const studioInfos = await studioRes.json();

    const priceRes = await fetch('http://localhost:1337/api/pricelists');
    const priceList = await priceRes.json();

    const reviewsRes = await fetch('http://localhost:1337/api/reviews');
    const reviews = await reviewsRes.json();

    const faqRes = await fetch('http://localhost:1337/api/faqs');
    const faq = await faqRes.json();

    const blogRes = await fetch('http://localhost:1337/api/blogs');
    const blog = await blogRes.json();

    const contactRes = await fetch('http://localhost:1337/api/contacts');
    const contact = await contactRes.json();

    return {
        props: {
            studioInfos,
            priceList,
            reviews,
            faq,
            blog,
            contact,
        },
    };
};
