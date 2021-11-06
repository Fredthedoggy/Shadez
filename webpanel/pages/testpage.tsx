import type { NextPage } from 'next';
import Head from 'next/head';
import tw from 'twin.macro';
import Dropdown from '../components/Menus/Dropdown';
import { css } from 'styled-components';
import Embed from '../components/Menus/Embed';
import { useState } from 'react';
import { APIEmbed } from 'discord-api-types/v9';

const TextPage: NextPage = () => {
    const [embed, setEmbed] = useState<APIEmbed>({
        title: 'title ~~(did you know you can have markdown here too?)~~',
        description:
            'this supports [named links](https://discordapp.com) on top of the previously shown subset of markdown. ```\nyes, even code blocks```',
        url: 'https://discordapp.com',
        color: 557508,
        timestamp: '2021-11-03T22:35:50.999Z',
        footer: {
            icon_url: 'https://cdn.discordapp.com/embed/avatars/0.png',
            text: 'footer text',
        },
        thumbnail: {
            url: 'https://cdn.discordapp.com/embed/avatars/0.png',
        },
        image: {
            url: 'https://cdn.discordapp.com/embed/avatars/0.png',
        },
        author: {
            name: 'author name',
            url: 'https://discordapp.com',
            icon_url: 'https://cdn.discordapp.com/embed/avatars/0.png',
        },
        fields: [
            {
                name: '🤔',
                value: 'some of these properties have certain limits...',
            },
            {
                name: '😱',
                value: 'try exceeding some of them!',
            },
            {
                name: '🙄',
                value: 'an informative error should show up, and this view will remain as-is until all issues are fixed',
            },
            {
                name: '<:thonkang:219069250692841473>',
                value: 'these last two',
                inline: true,
            },
            {
                name: '<:thonkang:219069250692841473>',
                value: 'are inline fields',
                inline: true,
            },
        ],
    });
    return (
        <div>
            <Head>
                <title>Shadez Discord Bot Test Page</title>
                <meta name="description" content="Shadez Discord Bot + Panel" />
                <link rel="icon" href={'/favicon.ico'} />
            </Head>

            <main>
                <div css={tw`bg-discord-600 w-screen min-h-screen flex py-6`}>
                    <div css={tw`m-auto flex flex-row flex-wrap gap-4`}>
                        <Dropdown
                            items={[
                                'Test',
                                <span
                                    css={css`
                                        color: hotpink;
                                    `}
                                >
                                    Wafflez
                                </span>,
                                'More Tests w/ Spaces',
                            ]}
                            filler={'Select an option'}
                            onChange={() => {}}
                        />
                        <div>
                            <Embed
                                editable={true}
                                embed={embed}
                                onChange={(e) => {
                                    setEmbed(e);
                                }}
                            />
                        </div>
                        <div>
                            <Embed
                                editable={false}
                                embed={embed}
                                onChange={undefined}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TextPage;
