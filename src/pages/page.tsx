/* eslint-disable @next/next/no-img-element */
"use client"
import { useState } from 'react';
import PriceList from '../components/PriceList';
import StudioSection from '../components/StudioSection';
import { GetStaticProps } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookF,
    faInstagram,
    faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import {
    faTimes,
    faBars
} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

export default function Home({ studioInfos, priceList, reviews, faq, blog, contact }: {
    studioInfos: any,
    priceList: any,
    reviews: any,
    faq: any,
    blog: any,
    contact: any
}) {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const router = useRouter();

    const changeLanguage = (locale: string) => {
        const router = useRouter();
        const currentPath = router.asPath;
        const pathWithoutLocale = currentPath.replace(/^\/(cz|en|ru)/, '');
        router.push(`/${locale}${pathWithoutLocale}`);
      };


    return (
        <div>
            qweqweeqw
            {/* Header / Навигационное меню */}
            <header className='fixed top-0 left-0 w-full bg-white shadow-md z-50'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center'>
                    <a href='#' className='text-xl sm:text-2xl font-bold text-gray-900'>
                        Popnailscz
                    </a>
                    <button
                        className='sm:hidden text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-md'
                        onClick={() => setMenuOpen(!isMenuOpen)}
                        aria-label='Toggle menu'
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? (
                            <FontAwesomeIcon icon={faTimes} className='w-6 h-6' />
                        ) : (
                            <FontAwesomeIcon icon={faBars} className='w-6 h-6' />
                        )}
                    </button>
                    <nav
                        className={`${isMenuOpen ? 'block' : 'hidden'} sm:block absolute top-full left-0 w-full bg-white sm:relative sm:w-auto sm:flex sm:items-center sm:space-x-4 p-0 sm:p-0 sm:shadow-none border-t border-gray-200 sm:border-0`}
                    >
                        <ul className='flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6'>
                            <li>
                                <a href='#about' className='text-lg sm:text-base text-gray-700 hover:text-pink-500'>O nás</a>
                            </li>
                            <li>
                                <a href='#services' className='text-lg sm:text-base text-gray-700 hover:text-pink-500'>Služby</a>
                            </li>
                            <li>
                                <a href='#faq' className='text-lg sm:text-base text-gray-700 hover:text-pink-500'>FAQ</a>
                            </li>
                            <li>
                                <a href='#blog' className='text-lg sm:text-base text-gray-700 hover:text-pink-500'>Blog</a>
                            </li>
                            <li>
                                <a href='#contacts' className='text-lg sm:text-base text-gray-700 hover:text-pink-500'>Kontakty</a>
                            </li>

                            {/* Social Media Icons */}
                            <li className='flex space-x-6 mt-4 sm:mt-0'>
                                <a href='https://wa.me/message/4KCKSARUH5V4G1' className='text-gray-600 hover:text-green-500' target='_blank' rel='noopener noreferrer'>
                                    <FontAwesomeIcon icon={faWhatsapp} className='w-6 h-6' />
                                </a>
                                <a href='https://www.instagram.com/popnails.cz' className='text-gray-600 hover:text-purple-500' target='_blank' rel='noopener noreferrer'>
                                    <FontAwesomeIcon icon={faInstagram} className='w-6 h-6' />
                                </a>
                                <a href='https://www.facebook.com/profile.php?id=61557978369758' className='text-gray-600 hover:text-pink-500' target='_blank' rel='noopener noreferrer'>
                                    <FontAwesomeIcon icon={faFacebookF} className='w-6 h-6' />
                                </a>
                            </li>
                            <button onClick={() => changeLanguage('cz')}>CZ</button>
                            <button onClick={() => changeLanguage('en')}>EN</button>
                            <button onClick={() => changeLanguage('ru')}>RU</button>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Hero секция */}
            <section className='flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative text-white' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/background_manicure.jpg')` }}>
                <div className='relative z-10 text-center px-2 sm:px-4'>
                    <h1 className='text-4xl sm:text-6xl font-bold mb-4 text-shadow'>
                        Popnailscz — Manikúra a Pedikúra v Praze
                    </h1>
                    <p className='mt-4 text-lg sm:text-xl mb-8 text-shadow'>
                        Vaše spokojenost, naše mise
                    </p>
                    <a href='https://n995838.alteg.io' className='mt-8 px-10 py-3 sm:px-20 sm:py-4 bg-pink-500 text-white text-lg sm:text-xl font-semibold rounded-lg shadow-lg hover:bg-pink-700'>
                        Objednat se online
                    </a>
                </div>
            </section>

            {/* О нас секция */}
            <section id='about' className='py-6 sm:py-12 bg-gray-100 text-center'>
                <StudioSection studioInfos={studioInfos} />
            </section>

            {/* Секция с ценами */}
            <section id='services' className='py-6 sm:py-12 bg-gray-100'>
                <PriceList priceList={priceList} />
            </section>

            {/* Секция с отзывами */}
            <section id='reviews' className='py-6 sm:py-12 bg-gray-100 text-center'>
                {/* Здесь будет компонент для отображения отзывов */}
            </section>

            {/* Секция с FAQ */}
            <section id='faq' className='py-8 sm:py-16 bg-white text-center'>
                {/* Здесь будет компонент для отображения FAQ */}
            </section>

            {/* Секция блога */}
            <section id='blog' className='py-8 sm:py-16 bg-gray-100 text-center'>
                {/* Здесь будет компонент для отображения блогов */}
            </section>

            {/* Секция контактов */}
            <section id='contacts' className='py-6 sm:py-12 bg-pink-100 text-center'>
                {/* Здесь будет компонент для отображения контактов */}
            </section>
        </div>
    );
}

// Получение данных из Strapi
export const getStaticProps: GetStaticProps = async () => {
    const studioRes = await fetch('http://localhost:1337/api/studioinfos');
    const studioInfos = await studioRes.json();

    const priceRes = await fetch('http://localhost:1337/api/pricelists');
    const priceList = await priceRes.json();

    // Запрос для отзывов
    const reviewsRes = await fetch('http://localhost:1337/api/reviews');
    const reviews = await reviewsRes.json();

    // Запрос для FAQ
    const faqRes = await fetch('http://localhost:1337/api/faqs');
    const faq = await faqRes.json();

    // Запрос для блогов
    const blogRes = await fetch('http://localhost:1337/api/blogs');
    const blog = await blogRes.json();

    // Запрос для контактов
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
}
