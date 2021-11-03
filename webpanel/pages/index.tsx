import type { NextPage } from 'next';
import Head from 'next/head';
import tw from 'twin.macro';
import { css } from 'styled-components';

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Shadez Discord Bot</title>
                <meta name="description" content="Shadez Discord Bot + Panel" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div css={tw`bg-main-400 w-screen h-screen flex`}>
                    <div css={tw`m-auto`}>
                        <div css={tw`text-6xl font-semibold text-white text-center mb-4`}>
                            Shadez Bot
                        </div>
                        <div
                            css={css`
                                ${tw`flex flex-row gap-2`}
                                > button {
                                    ${tw`border-white border-2 px-8 py-2 rounded-md text-white font-semibold text-xl`}
                                }
                            `}
                        >
                            <button css={tw`flex-grow flex-shrink`}>
                                Invite
                            </button>
                            <button css={tw`flex-grow flex-shrink`}>
                                Panel
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
